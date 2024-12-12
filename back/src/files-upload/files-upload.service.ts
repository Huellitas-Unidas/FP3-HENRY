import { Injectable } from '@nestjs/common';
import { cloudinary } from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class FilesUploadService {
  private readonly folder = 'HuellitasUnidas';

  async uploadPostImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    try {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          {
            folder: this.folder,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        upload.end(file.buffer);
      });
    } catch (error) {
      throw new Error(`Failed to upload image: ${error}`);
    }
  }
}
