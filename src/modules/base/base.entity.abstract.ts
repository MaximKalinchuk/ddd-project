import { CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';

export abstract class BaseEntity {
	@PrimaryColumn('uuid')
	public id: string;
	@CreateDateColumn({ nullable: true })
	public created_At: Date;
	@UpdateDateColumn({ nullable: true })
	public updated_At: Date;
	@DeleteDateColumn({ nullable: true })
	public deleted_At: Date;
}
