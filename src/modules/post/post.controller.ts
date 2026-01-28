// posts/post.controller.ts
import { Body, Controller, Delete, Get, Patch, Post, Param, UseGuards, Req } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request } from "express";
import { User } from "../user/entities/user.entity";

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    // Post yaratish (login qilgan user)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req: Request & { user: User }, @Body() dto: CreatePostDto) {
        return this.postService.createPost(req.user, dto);
    }

    // Barcha postlarni olish
    @Get()
    getAll() {
        return this.postService.findAll();
    }

    // Bitta postni olish
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.postService.findOne(id);
    }

    // Postni yangilash
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
        return this.postService.update(id, dto);
    }

    // Postni o‘chirish
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.postService.remove(id);
    }
}
