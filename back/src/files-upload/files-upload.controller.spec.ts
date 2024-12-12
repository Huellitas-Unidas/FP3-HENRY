import { Test, TestingModule } from '@nestjs/testing';
import { FilesUploadController } from './files-upload.controller';
import { FilesUploadService } from './files-upload.service';

describe('FilesUploadController', () => {
  let controller: FilesUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesUploadController],
      providers: [FilesUploadService],
    }).compile();

    controller = module.get<FilesUploadController>(FilesUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
