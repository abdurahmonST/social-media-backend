import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

@Entity()
export class FriendRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    sender: User;

    @ManyToOne(() => User)
    receiver: User;

    @Column({ type: 'enum', enum: ['pending', 'accepted', 'rejected'], default: 'pending'})
    status: FriendRequestStatus;

    @CreateDateColumn()
    createdAt: Date;
}