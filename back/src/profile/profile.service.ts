import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FilesUploadService } from 'src/files-upload/files-upload.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesUploadService: FilesUploadService,
  ) {}
  async uploadOrUpdatePicture(userId: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const uploadResult = await this.filesUploadService.uploadPostImage(file);

    if (user.profilePicture) {
      const publicId = this.extractPublicIdFromUrl(user.profilePicture);
      await this.filesUploadService.deleteImage(publicId);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { profilePicture: uploadResult.secure_url },
    });

    return updatedUser;
  }

  async deleteProfilePicture(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!user.profilePicture) {
      throw new BadRequestException(
        'El usuario no tiene una foto de perfil para eliminar',
      );
    }

    const publicId = this.extractPublicIdFromUrl(user.profilePicture);
    await this.filesUploadService.deleteImage(publicId);

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { profilePicture: null },
    });

    return updatedUser;
  }
  private extractPublicIdFromUrl(url: string): string {
    const parts = url.split('/');
    const folderAndPublicId = parts.slice(parts.length - 2).join('/');
    return folderAndPublicId.split('.')[0];
  }
}
