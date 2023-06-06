import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MinioService } from '../minio.service';
import * as AdmZip from 'adm-zip';
import * as path from 'path';

export class GetAllFilesCommand {
	public userId: string;

	constructor(userId: string) {
		this.userId = userId;
	}
}

@CommandHandler(GetAllFilesCommand)
export class GetAllFilesUseCase implements ICommandHandler<GetAllFilesCommand> {
	constructor(private readonly minioService: MinioService) {}

	async execute(command: GetAllFilesCommand): Promise<any> {
		const zip = new AdmZip();

		const filePath = './dist/file-storage';
		const zipPath = './dist/file-storage';
		const allFilesList = await this.minioService.getUserFiles(command.userId);

		for (const file of allFilesList) {
			const currentFile = await file;

			const currentFilePath = path.join(`${filePath}/${command.userId}`, currentFile[0]);
			await zip.addLocalFile(currentFilePath);
			await zip.writeZip(path.join(`${zipPath}/${command.userId}`, 'allFiles.zip'));
		}

		return `file-storage/${command.userId}/allFiles.zip`;
	}
}
