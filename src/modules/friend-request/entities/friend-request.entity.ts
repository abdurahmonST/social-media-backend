import { User } from 'src/modules/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Unique,
} from 'typeorm';

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

@Entity()
@Unique(['sender', 'receiver'])
export class FriendRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    sender: User;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    receiver: User;

    @Column({ type: 'enum', enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
    status: FriendRequestStatus;

    @CreateDateColumn()
    createdAt: Date;
}
