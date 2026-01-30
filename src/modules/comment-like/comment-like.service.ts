import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentLike } from './entities/comment-like.entity';
import { Comment } from '../comment/entities/comment.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentLikeService {
    constructor(
        @InjectRepository(CommentLike)
        private likeRepo: Repository<CommentLike>,

        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,
    ) { }

    // 👍 toggle like
    async toggle(commentId: string, user: User) {
        const comment = await this.commentRepo.findOne({
            where: { id: commentId },
        });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        const existingLike = await this.likeRepo.findOne({
            where: {
                user: { id: user.id },
                comment: { id: commentId },
            },
        });

        // 👎 unlike
        if (existingLike) {
            await this.likeRepo.remove(existingLike);
            return { liked: false };
        }

        // 👍 like
        const like = this.likeRepo.create({
            user,
            comment,
        });

        await this.likeRepo.save(like);
        return { liked: true };
    }

    // 🔢 like count
    async count(commentId: string) {
        return this.likeRepo.count({
            where: { comment: { id: commentId } },
        });
    }

    // ❤️ user like qilganmi?
    async isLiked(commentId: string, userId: string) {
        const like = await this.likeRepo.findOne({
            where: {
                comment: { id: commentId },
                user: { id: userId },
            },
        });

        return Boolean(like);
    }
}
