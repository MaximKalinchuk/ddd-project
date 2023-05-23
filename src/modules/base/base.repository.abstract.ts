import { Repository } from 'typeorm';
import { IBaseRepository } from './interface/base.repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
	constructor(private readonly baseRepository: Repository<T>) {}

	async save(model: T): Promise<T> {
		return await this.baseRepository.save(model);
	}

	async softDelete(id: string): Promise<boolean> {
		await this.baseRepository.softDelete(id);
		return true;
	}

	async delete(id: string): Promise<boolean> {
		await this.baseRepository.delete(id);
		return true;
	}
}
