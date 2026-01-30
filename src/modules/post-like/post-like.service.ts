import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostLike } from './entities/post-like.entity';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostLikeService {
    constructor(
        @InjectRepository(PostLike)
        private likeRepo: Repository<PostLike>,

        @InjectRepository(Post)
        private postRepo: Repository<Post>,
    ) { }

    // 👍 toggle like
    async toggle(postId: string, user: User) {
        const post = await this.postRepo.findOne({ where: { id: postId } });

        if (!post) throw new NotFoundException('Post not found');

        const existingLike = await this.likeRepo.findOne({
            where: { user: { id: user.id }, post: { id: postId } },
        });

        if (existingLike) {
            await this.likeRepo.remove(existingLike);
            return { liked: false };
        }

        const like = this.likeRepo.create({ user, post });
        await this.likeRepo.save(like);
        return { liked: true };
    }

    // 🔢 like count
    async count(postId: string) {
        return this.likeRepo.count({ where: { post: { id: postId } } });
    }

    // ❤️ user like qilganmi
    async isLiked(postId: string, userId: string) {
        const like = await this.likeRepo.findOne({
            where: { post: { id: postId }, user: { id: userId } },
        });
        return Boolean(like);
    }
}
