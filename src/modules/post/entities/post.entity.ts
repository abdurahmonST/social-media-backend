import { Comment } from "src/modules/comment/entities/comment.entity";
import { PostLike } from "src/modules/post-like/entities/post-like.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @Column({ nullable: true })
    photoUrl: string;

    @Column({ nullable: true })
    videoUrl?: string;

    @Column({ default: 0 })
    likesCount: number;

    @Column({ default: 0 })
    commentsCount: number;

    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
    author: User;

    @OneToMany(() => PostLike, (like) => like.post)
    likes: PostLike[];

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
