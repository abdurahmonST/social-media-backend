import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @Column({ nullable: true})
    photoUrl: string;

    @Column({ nullable: true})
    videoUrl?: string;

    @Column({ default: 0})
    likesCount: number;

    @Column({ default: 0 })
    commentsCount: number;

    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE'})
    author: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}