import { CommentLike } from "src/modules/comment-like/entities/comment-like.entity";
import { Post } from "src/modules/post/entities/post.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @ManyToOne(() => User, (user) => user.comments, { 
        onDelete: 'CASCADE',
    })
    user: User;

    @ManyToOne(() => Post, (post) => post.comments, { 
        onDelete: 'CASCADE',
    })
    post: Post;

    @ManyToOne(() => Comment, (comment) => comment.replies, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    parent: Comment;

    @OneToMany(() => Comment, (comment) => comment.parent)
    replies: Comment[];

    @OneToMany(() => CommentLike, (like) => like.comment)
    likes: CommentLike[];

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}