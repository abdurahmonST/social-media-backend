import { Comment } from 'src/modules/comment/entities/comment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['user', 'comment'])
export class CommentLike {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
    comment: Comment;

    @CreateDateColumn()
    createdAt: Date;
}
