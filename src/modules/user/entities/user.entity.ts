import { Post } from "src/modules/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column({ select: false})
    password: string;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 'user' })
    role: 'user' | 'admin';

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
