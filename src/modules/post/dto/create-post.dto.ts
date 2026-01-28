// create-post.dto.ts
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    @IsUrl()
    photoUrl?: string;

    @IsOptional()
    @IsString()  
    videoUrl?: string;
}
