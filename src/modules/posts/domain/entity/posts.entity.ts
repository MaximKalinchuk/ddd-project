import { Entity, Column, ManyToOne, JoinTable, JoinColumn, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity.abstract';
import { IPost } from '../interfaces/post.interface';
import { UsersEntity } from '../../../users/domain/entity/users.entity';
import { CreatePostInputModel } from '../../api/models/input/createPost.input-modul';
import { randomUUID } from 'crypto';

@Entity('posts')
export class PostsEntity extends BaseEntity {
	@Column({ nullable: true })
	img: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@ManyToOne(() => UsersEntity, (user) => user.posts, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: UsersEntity;

	static create(postData: CreatePostInputModel): PostsEntity {
		const newPost = new PostsEntity();
		newPost.id = randomUUID();
		newPost.title = postData.title;
		newPost.description = postData.description;
		newPost.img = postData.img;
		return newPost;
	}
}
