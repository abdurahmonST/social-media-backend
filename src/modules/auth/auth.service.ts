import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from 'bcrypt'
import { LoginDto } from "./dto/login.dto";
import { UnauthorizedException } from "@nestjs/common";

export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signup(dto: SignUpDto) {
        const { email, username, password } = dto;
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = this.userRepository.create({
            email,
            username,
            password: hashedPassword,
        })

        await this.userRepository.save(user)

         const token = this.jwtService.sign({ userId: user.id });

         return {
            "token": token,
            "Data": user
         };
    }

    async login(dto: LoginDto) {
        const user = await this.userRepository.findOne({ where: {email: dto.email}, select: ["id", "password", "email", "username"] });
        if(!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if(!isPasswordValid) {
            throw new UnauthorizedException('Password is Error')
        }

        const token = this.jwtService.sign({ userId: user.id })

        return {
            "token: ": token,
            "data: ": user
        };
    }

    async validateUser(userId: string) {
        return this.userRepository.findOne({ where: { id: userId }});
    }
}
