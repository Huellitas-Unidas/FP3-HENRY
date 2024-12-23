import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private emailService: EmailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('El correo electrónico ya está en uso', 409);
    }

    const hashedPassword = await this.authService.hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    await this.emailService.sendMail(
      email,
      'Bienvenido a nuestra plataforma',
      `Hola ${name},\n\n¡Gracias por registrarte! Estamos felices de tenerte con nosotros.\n\nSaludos,\nEl equipo de Huellas Unidas!`,
    );

    return { user };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await this.authService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.authService.generateToken(payload);

    return {
      message: `Te has logueado exitosamente.`,
      token: token,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
        pets: true,
        donations: true,
        pqr: true,
      },
    });

    if (!user) {
      throw new HttpException(`Usuario con ID ${id} no encontrado`, 404);
    }
    const { password, ...responseUser } = user;
    const responsePost = user.posts.map(({ userId, ...post }) => post);
    return {
      ...responseUser,
      posts: responsePost,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException(`Usuario con ID ${id} no encontrado`, 404);
    }
    await this.prisma.user.delete({
      where: { id },
    });
    return { message: `Usuario con ID ${id} eliminado exitosamente` };
  }
}
