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
    const { id, email, password, name, phone, googleId, role } = createUserDto;

    // Buscar usuario por email o googleId
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { googleId }],
      },
    });

    if (existingUser) {
      throw new HttpException(
        'El correo electrónico o Google ID ya están en uso',
        409,
      );
    }

    let hashedPassword = null;

    if (password) {
      hashedPassword = await this.authService.hashPassword(password);
    }

    const userData = {
      id: id || undefined, // UUID generado automáticamente por Prisma
      email,
      password: hashedPassword,
      phone: String(phone),
      name,
      googleId: googleId || null,
      role: role ? (role.toUpperCase() as Role) : 'USER',
    };

    const user = await this.prisma.user.create({
      data: userData,
    });

    return {
      user,
      message: 'Usuario creado exitosamente.',
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
        posts: {
          include: {
            location: true,
          },
        },
      },
    });
    if (!user) {
      throw new HttpException(`Usuario con ID ${id} no encontrado`, 404);
    }
    return user.posts;
  }
}
