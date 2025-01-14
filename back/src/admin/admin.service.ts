import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    return await this.prismaService.user.findMany(); 
  }

  async updateUser(id: string, data: any) {
    const userToUpdate = await this.prismaService.user.findUnique({
      where: { id },
    });
  
    if (!userToUpdate) {
      throw new Error('Usuario no encontrado');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data,
    });

    return {
      message: `Usuario con el ID ${id} ha sido actualizado.`,
      user: updatedUser,
    };
  }
  

  async deleteUser(id: string) {
 
    const userToDelete = await this.prismaService.user.findUnique({
      where: { id },
    });
  
    if (!userToDelete) {
      throw new Error('Usuario no encontrado');
    }
  
    await this.prismaService.post.deleteMany({
      where: { userId: id },
    });
  
    await this.prismaService.pets.deleteMany({
      where: { userId: id },
    });
  
    await this.prismaService.donations.deleteMany({
      where: { userId: id },
    });
  
    await this.prismaService.notifications.deleteMany({
      where: { userId: id },
    });
  
    await this.prismaService.pqr.deleteMany({
      where: { userId: id },
    });
  
  
    await this.prismaService.user.delete({
      where: { id },
    });
  
    
    return {
      message: `Usuario con el ID ${id} ha sido eliminado.`,
      user: userToDelete, 
    };
  }
 
  async deletePost(id: string) {
    const postToDelete = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!postToDelete) {
      throw new NotFoundException('Post no encontrado');
    }

    await this.prismaService.post.delete({
      where: { id },
    });

    return {
      message: `El post con el ID ${id} ha sido eliminado.`,
      post: postToDelete,
    };
  }
  async getAllDonations() {
    return await this.prismaService.donations.findMany({
      include: {
        user: true,
      },
    });
  }
  
}
