import { Post } from 'src/modules/post/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['user', 'post']) // bitta user bitta postni faqat 1 marta like qila oladi
export class PostLike {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    post: Post;

    @CreateDateColumn()
    createdAt: Date;
}
