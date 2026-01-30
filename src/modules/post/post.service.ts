import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
    ) { }

    // Post yaratish (login qilgan user bilan)
    async createPost(user: User, dto: CreatePostDto) {
        const post = this.postRepo.create({
            ...dto,
            author: user,
        });
        return this.postRepo.save(post);
    }

    // Barcha postlarni olish (comments va likes bilan)
    async findAll() {
        return this.postRepo
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.comments", "comments")
            .leftJoinAndSelect("comments.user", "commentUser")
            .leftJoinAndSelect("post.likes", "likes")
            .getMany();
    }

    // Bitta postni olish (comments va likes bilan)
    async findOne(id: string) {
        const post = await this.postRepo
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.comments", "comments")
            .leftJoinAndSelect("comments.user", "commentUser")
            .leftJoinAndSelect("post.likes", "likes")
            .where("post.id = :id", { id })
            .getOne();

        if (!post) throw new NotFoundException("Post not found");
        return post;
    }

    async update(id: string, dto: UpdatePostDto) {
        await this.findOne(id);
        await this.postRepo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string) {
        const post = await this.findOne(id);
        return this.postRepo.remove(post);
    }
}
