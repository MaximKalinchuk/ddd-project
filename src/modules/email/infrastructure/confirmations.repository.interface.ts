import { IBaseRepository } from 'src/modules/base/interface/base.repository.interface';
import { EmailConfirmationEntity } from '../domain/entity/emailConfirmation.entity';

export interface IConfirmationRepository extends IBaseRepository<EmailConfirmationEntity> {}
