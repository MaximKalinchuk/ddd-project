import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { MyBaseEntity } from '../../../base/base.entity.abstract';
import { IPost } from '../interfaces/post.interface';
import { UsersEntity } from '../../../users/domain/entity/users.entity';
import { CreatePostInputModel } from '../../api/models/createPost.input-modul';

@Entity('posts')
export class PostsEntity extends MyBaseEntity implements IPost {
	@Column()
	userId: string;

	@Column({ nullable: true })
	img: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@ManyToOne(() => UsersEntity, (user) => user.posts, {
		onDelete: 'CASCADE',
	})
	@JoinTable()
	user: UsersEntity;

	constructor(userId?: string, postData?: CreatePostInputModel) {
		super();

		if (userId) {
			this.userId = userId;
		}

		if (postData) {
			this.img = postData.img;
			this.title = postData.title;
			this.description = postData.description;
		}
	}
}
