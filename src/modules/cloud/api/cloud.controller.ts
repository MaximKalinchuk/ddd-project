import {
	Controller,
	Delete,
	Get,
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
import { GetAllFilesCommand } from '../application/useCases/getAllFiles.use-case';
import { CommandBus } from '@nestjs/cqrs';
import { AtPublic } from '../../../common/decorators/accessPublic.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

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
				const fileName = await this.minioService.uploadFile(user.id, file);
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
			}
		} else {
			throw new UnauthorizedException();
		}
	}

	@AtPublic()
	@Get('file/:fileName')
	async getFile(@Param('fileName') fileName: string) {
		const fileUrl = await this.minioService.getFileUrl(fileName);
		return fileUrl;
	}

	@Delete('file/:fileName')
	async deleteFile(@Param('fileName') fileName: string) {
		await this.minioService.deleteFile(fileName);
		return fileName;
	}
}
