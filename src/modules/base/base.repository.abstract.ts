import { BaseEntity, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IBaseRepository } from './interface/base.repository.interface';
export abstract class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
	constructor(private readonly baseRepository: Repository<T>) {}

	async save(model: T): Promise<T> {
		return await model.save();
	}
	async remove(model: T): Promise<boolean> {
		await model.remove();
		return true;
	}
	async softRemove(model: T): Promise<boolean> {
		await model.softRemove();
		return true;
	}
	async findOne(options: FindOneOptions<T>): Promise<T> {
		const findOneModel = await this.baseRepository.findOne(options);
		return findOneModel;
	}
	async findMany(options: FindManyOptions<T>): Promise<T[]> {
		const findManyModel = await this.baseRepository.find(options);
		return findManyModel;
	}
}
