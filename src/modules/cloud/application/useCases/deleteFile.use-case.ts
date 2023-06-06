import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as Minio from 'minio';

export class DeleteFileCommand {
	public fileName: string;
	public userId: string;

	constructor(fileName: string, userId: string) {
		this.fileName = fileName;
		this.userId = userId;
	}
}

@CommandHandler(DeleteFileCommand)
export class DeleteFileUseCase implements ICommandHandler<DeleteFileCommand> {
	private minioClient: Minio.Client;
	private bucketName: string;

	private readonly logger = new Logger(DeleteFileUseCase.name);
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

	async execute(command: DeleteFileCommand) {
		const { userId, fileName } = command;

		this.logger.log(`Пользователь ${userId} удаляет файл ${fileName} в cloud`);
		await this.minioClient.removeObject(this.bucketName, userId + '/' + fileName);
	}
}
