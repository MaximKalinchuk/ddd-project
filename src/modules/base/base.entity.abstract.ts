import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBaseEntity } from './interface/base.entity.interface';

@Entity()
export abstract class MyBaseEntity extends BaseEntity implements IBaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
	createdAt: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
	updatedAt: Date;
}
