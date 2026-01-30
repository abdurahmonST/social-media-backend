import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    content: string;

    @IsUUID()
    postId: string;

    @IsOptional()
    @IsUUID()
    parentId?: string;
}
