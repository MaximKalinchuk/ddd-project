import { Module } from '@nestjs/common';
import { MinioService } from './application/minio.service';
import { CloudController } from './api/cloud.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllFilesUseCase } from './application/useCases/getAllFiles.use-case';

const useCases = [GetAllFilesUseCase];

@Module({
	imports: [CqrsModule],
	controllers: [CloudController],
	providers: [...useCases, MinioService],
	exports: [],
})
export class CloudModule {}
