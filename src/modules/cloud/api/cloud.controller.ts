import {
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MinioService } from '../application/minio.service';
import { GetAllFilesCommand } from '../application/useCases/queryCommand/getAllFiles.use-case';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileCommand } from '../application/useCases/uploadFile.use-case';
import { GetFileCommand } from '../application/useCases/queryCommand/getFile.use-case';
import { DeleteFileCommand } from '../application/useCases/deleteFile.use-case';

@Controller('cloud')
export class CloudController {
	constructor(private readonly minioService: MinioService, private readonly commandBus: CommandBus) {}

	@Post('file')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
		const user = req.user;
		if ('id' in user) {
			if (typeof user.id === 'string') {
				await this.minioService.createBucketIfNotExists();
				const fileName = await this.commandBus.execute(new UploadFileCommand(user.id, file));
				return fileName;
			}
		} else {
			throw new UnauthorizedException();
		}
	}

	@Get('file/all')
	async getAllUserFiles(@Res() res: Response, @Req() req: Request) {
		const user = req.user;
		if ('id' in user) {
			if (typeof user.id === 'string') {
				const filePath = await this.commandBus.execute(new GetAllFilesCommand(user.id));
				res.download(`${__dirname}/${filePath}`);
				await this.minioService.deleteLocalFiles(user.id);
			}
		} else {
			throw new UnauthorizedException();
		}
	}

	@Get('file/:fileName')
	async getFile(@Param('fileName') fileName: string, @Req() req: Request) {
		const user = req.user;
		if ('id' in user) {
			if (typeof user.id === 'string') {
				const fileUrl = await this.commandBus.execute(new GetFileCommand(fileName, user.id));
				return fileUrl;
			}
		} else {
			throw new UnauthorizedException();
		}
	}

	@Delete('file/:fileName')
	async deleteFile(@Param('fileName') fileName: string, @Req() req: Request) {
		const user = req.user;
		if ('id' in user) {
			if (typeof user.id === 'string') {
				await this.commandBus.execute(new DeleteFileCommand(fileName, user.id));
				return fileName;
			}
		} else {
			throw new UnauthorizedException();
		}
	}
}
