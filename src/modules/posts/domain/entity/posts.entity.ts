import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { MyBaseEntity } from '../../../base/base.entity.abstract';
import { IPost } from '../interfaces/post.interface';
import { UsersEntity } from '../../../users/domain/entity/users.entity';

@Entity('posts')
export class PostsEntity extends MyBaseEntity implements IPost {
	@Column({ nullable: true })
	img: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@ManyToOne(() => UsersEntity, (users) => users.posts, {
		onDelete: 'CASCADE',
	})
	@JoinTable()
	users: UsersEntity;
}
