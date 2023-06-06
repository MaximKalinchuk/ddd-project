import { Module } from '@nestjs/common';
import { MinioService } from './application/minio.service';
import { CloudController } from './api/cloud.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllFilesUseCase } from './application/useCases/queryCommand/getAllFiles.use-case';
import { UploadFileUseCase } from './application/useCases/uploadFile.use-case';
import { GetFileUseCase } from './application/useCases/queryCommand/getFile.use-case';
import { DeleteFileUseCase } from './application/useCases/deleteFile.use-case';

const useCases = [GetAllFilesUseCase, UploadFileUseCase, GetFileUseCase, DeleteFileUseCase];

@Module({
	imports: [CqrsModule],
	controllers: [CloudController],
	providers: [...useCases, MinioService],
	exports: [],
})
export class CloudModule {}
