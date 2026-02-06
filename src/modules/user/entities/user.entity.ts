import { Comment } from "src/modules/comment/entities/comment.entity";
import { Follow } from "src/modules/follow/entities/follow.entity";
import { Post } from "src/modules/post/entities/post.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export type Gender = 'male' | 'female' | 'other';
export type UserRole = 'user' | 'admin';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Personal info
    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true})
    lastName: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
    gender: Gender;

    // Account info
    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    // Optional profile info
    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
    role: UserRole;

    @Column({ nullable: true })
    refreshToken?: string;

    // Relations
    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    // Follow relations
    @OneToMany(() => Follow, (follow) => follow.follower)
    following: Follow[];

    @OneToMany(() => Follow, (follow) => follow.following)
    followers: Follow[];

    // Timestamps
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
