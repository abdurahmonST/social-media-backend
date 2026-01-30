// src/comments/comments.service.ts
import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { CreateCommentDto } from './dto/create-comment';
import { User } from '../user/entities/user.entity';
import { UpdateCommentDto } from './dto/update-comment';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,

        @InjectRepository(Post)
        private postRepo: Repository<Post>,
    ) { }

    async create(dto: CreateCommentDto, user: User) {
        const post = await this.postRepo.findOne({
            where: { id: dto.postId },
        });

        if (!post) throw new NotFoundException('Post not found');

        const comment = this.commentRepo.create({
            content: dto.content,
            post,
            user,
            ...(dto.parentId && {
                parent: { id: dto.parentId } as Comment,
            })
        });

        return this.commentRepo.save(comment);
    }

    async findPostComments(postId: string) {
        return this.commentRepo.find({
            where: {
                post: { id: postId },
                parent: IsNull(),
            },
            relations: ['user', 'replies', 'replies.user'],
            order: { createdAt: 'DESC' },
        });
    }

    async update(id: string, dto: UpdateCommentDto, user: User) {
        const comment = await this.commentRepo.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!comment) throw new NotFoundException('Comment not found');
        if (comment.user.id !== user.id)
            throw new ForbiddenException('Access denied');

        comment.content = dto.content;
        return this.commentRepo.save(comment);
    }

    async remove(id: string, user: User) {
        const comment = await this.commentRepo.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!comment) throw new NotFoundException('Comment not found');
        if (comment.user.id !== user.id)
            throw new ForbiddenException('Access denied');

        await this.commentRepo.remove(comment);
        return { message: 'Comment deleted' };
    }
}
