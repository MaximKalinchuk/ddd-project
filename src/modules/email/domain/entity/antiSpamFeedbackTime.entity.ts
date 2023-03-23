import { UsersEntity } from 'src/modules/users/domain/entity/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('antiSpamFeedbackTime')
export class AntiSpamFeedbackTime extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	userId: string;

	@Column({ nullable: true })
	createdAt: Date;

	@OneToOne(() => UsersEntity, (user) => user.feedbackTime, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: UsersEntity;

	constructor(userId?: string) {
		super();

		if (userId) {
			this.userId = userId;
		}
	}
}
