import { IBaseRepository } from 'src/modules/base/interface/base.repository.interface';
import { PasswordRecoveryEntity } from '../domain/entity/passwordRecovery.entity';

export interface IPasswordRepository extends IBaseRepository<PasswordRecoveryEntity> {}
