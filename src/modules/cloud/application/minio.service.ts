import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class MinioService {
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

	async createBucketIfNotExists() {
		const bucketExists = await this.minioClient.bucketExists(this.bucketName);
		if (!bucketExists) {
			await this.minioClient.makeBucket(this.bucketName, 'eu-west-1');
		}
	}

	async getUserFiles(userId: string) {
		const filesForDownload = [];

		const stream = await this.minioClient.listObjects(this.bucketName, `${userId}`, true);
		const result = await new Promise((resolve, reject) => {
			stream.on('data', (obj) =>
				filesForDownload.push({
					name: obj.name.split('/').pop(),
					size: obj.size,
				}),
			);
			stream.on('error', (err) => reject(err));
			stream.on('end', () => resolve(filesForDownload));
		});

		await result;

		const fileList = await filesForDownload.map(async (el) => {
			await this.minioClient.fGetObject(
				this.bucketName,
				`${userId}/${el.name}`,
				`./dist/file-storage/${userId}/${el.name}`,
			);

			const result = await [el.name, el.size];

			return await result;
		});

		return fileList;
	}

	async deleteLocalFiles(userId: string) {
		const dirPath = path.join('./dist/file-storage/' + userId);
		const allFilesList = await this.getUserFiles(userId);

		for (const file of allFilesList) {
			const currentFile = await file;
			await fs.unlink(`./dist/file-storage/${userId}/${currentFile[0]}`);
		}

		await fs.rm(dirPath, { recursive: true });
	}
}
