import { IBaseRepository } from 'src/modules/base/interface/base.repository.interface';
import { UsersEntity } from '../domain/entity/users.entity';

export interface IUserRepository extends IBaseRepository<UsersEntity> {}
