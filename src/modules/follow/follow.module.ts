import { Module } from "@nestjs/common";
import { FollowService } from "./follow.service";
import { FollowController } from "./follow.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follow } from "./entities/follow.entity";
import { User } from "../user/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Follow, User])],
    providers: [FollowService],
    controllers: [FollowController],
    exports: [FollowService]
})

export class FollowModule {}