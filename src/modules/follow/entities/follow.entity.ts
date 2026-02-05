import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Unique,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
@Unique(['follower', 'following'])
export class Follow {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
    follower: User;

    @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
    following: User;

    @CreateDateColumn()
    createdAt: Date;
}
