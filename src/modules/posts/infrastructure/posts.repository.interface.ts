import { IBaseRepository } from 'src/modules/base/interface/base.repository.interface';
import { PostsEntity } from '../domain/entity/posts.entity';

export interface IPostsRepository extends IBaseRepository<PostsEntity> {}
