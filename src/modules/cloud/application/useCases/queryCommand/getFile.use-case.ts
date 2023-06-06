import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as Minio from 'minio';

export class GetFileCommand {
	public fileName: string;
	public userId: string;
	constructor(fileName: string, userId: string) {
		this.fileName = fileName;
		this.userId = userId;
	}
}

@CommandHandler(GetFileCommand)
export class GetFileUseCase implements ICommandHandler<GetFileCommand> {
	private minioClient: Minio.Client;
	private bucketName: string;

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

	async execute(command: GetFileCommand) {
		const { userId, fileName } = command;
		return await this.minioClient.presignedUrl('GET', this.bucketName, userId + '/' + fileName);
	}
}
