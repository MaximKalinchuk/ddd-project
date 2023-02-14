import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
export interface IBaseRepository<T> {
	save(model: DeepPartial<T>): Promise<T>;
	remove(model: DeepPartial<T>): Promise<boolean>;
	softRemove(model: DeepPartial<T>): Promise<boolean>;
	findOne(model: FindOneOptions<T>): Promise<T>;
	findMany(model: FindManyOptions<T>): Promise<T[]>;
}
