import { IBaseRepository } from 'src/modules/base/interface/base.repository.interface';
import { ConfirmationEntity } from '../domain/entity/confirmations.entity';

export interface IConfirmationRepository extends IBaseRepository<ConfirmationEntity> {}
