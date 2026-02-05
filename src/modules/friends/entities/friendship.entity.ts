import { User } from "src/modules/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friendship {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user1: User;

    @ManyToOne(() => User)
    user2: User;

    @CreateDateColumn()
    createdAt: Date;
}