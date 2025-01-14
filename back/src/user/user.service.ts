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
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, name, phone, role } = createUserDto;

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
        phone: String(phone),
        name,
        role: (role ? role.toUpperCase() : 'USER') as Role,
      },
    });

    await this.emailService.sendMailWithTemplate(
      user.email,
      'register',
      {
        name: user.name,
      },
      'register',
    );

    return {
      user,
      message: 'Usuario creado exitosamente y correo enviado.',
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
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
  
    const payload = { email: user.email, sub: user.id, role: user.role };
  
    const token = this.authService.generateToken(payload);
  
    return {
      message: 'Te has logueado exitosamente.',
      token,
      userId: user.id, 
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
      data: {
        ...updateUserDto,
        role: updateUserDto.role
          ? (updateUserDto.role.toUpperCase() as Role)
          : undefined,
      },
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
  async userPets(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        pets: true,
      },
    });
    if (!user) {
      throw new HttpException(`Usuario con ID ${id} no encontrado`, 404);
    }
    return user.pets;
  }
  async userPosts(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
    if (!user) {
      throw new HttpException(`Usuario con ID ${id} no encontrado`, 404);
    }
    return user.posts;
  }
}
