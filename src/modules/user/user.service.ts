import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = this.usersRepo.create(dto);
        return this.usersRepo.save(user);
    }

    findAll() {
        return this.usersRepo.find({
            select: ['id', 'email', 'username', 'bio', 'avatarUrl', 'createdAt', 'updatedAt'],
        });
    }

    async findOne(id: string) {
        const user = await this.usersRepo.findOne({ where: { id }});

        if(!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async update(id: string, dto: UpdateUserDto) {
        await this.findOne(id);
        await this.usersRepo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        return this.usersRepo.remove(user);
    }
}