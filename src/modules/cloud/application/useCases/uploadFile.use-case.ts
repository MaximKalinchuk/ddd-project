import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as Minio from 'minio';

export class UploadFileCommand {
	public userId: string;
	public file: Express.Multer.File;

	constructor(userId: string, file: Express.Multer.File) {
		this.userId = userId;
		this.file = file;
	}
}

@CommandHandler(UploadFileCommand)
export class UploadFileUseCase implements ICommandHandler<UploadFileCommand> {
	private minioClient: Minio.Client;
	private bucketName: string;

	private readonly logger = new Logger(UploadFileUseCase.name);
	constructor(private readonly configService: ConfigService) {
		this.minioClient = new Minio.Client({
			endPoint: this.configService.get('MINIO_ENDPOINT'),
			port: Number(this.configService.get('MINIO_PORT')),
			useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
			accessKey: this.configService.get('MINIO_ACCESS_KEY'),
			secretKey: this.configService.get('MINIO_SECRET_KEY'),
		});
		this.bucketName = this.configService.get('MINIO_BUCKET_NAME');
	}

	async execute(command: UploadFileCommand) {
		const { userId, file } = command;
		const fileName = `${Date.now()}-${file.originalname}`;

		this.logger.log(`Пользователь ${userId} загружает файл ${fileName} в cloud`);

		await this.minioClient.putObject(this.bucketName, userId + '/' + fileName, file.buffer, file.size);
		return fileName;
	}
}
