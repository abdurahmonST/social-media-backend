import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { SignUpDto } from "./dto/sign-up.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    // ✅ Signup
    async signup(dto: SignUpDto) {
        const { email, username, password, firstName, lastName } = dto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            email,
            username,
            firstName,
            lastName,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        const accessToken = this.jwtService.sign({ userId: user.id });
        const refreshToken = this.jwtService.sign(
            { userId: user.id },
            { expiresIn: "7d" } // uzun muddatli token
        );

        // DB ga refresh token saqlaymiz
        user.refreshToken = refreshToken;
        await this.userRepository.save(user);

        return {
            accessToken,
            refreshToken, // frontend localStorage yoki httpOnly cookie
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl,
                role: user.role,
            },
        };
    }

    // ✅ Login
    async login(dto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
            select: [
                "id",
                "password",
                "email",
                "username",
                "firstName",
                "lastName",
                "bio",
                "birthday"
            ],
        });

        if (!user) throw new UnauthorizedException("User not found");

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Password incorrect");

        const accessToken = this.jwtService.sign({ userId: user.id });
        const refreshToken = this.jwtService.sign({ userId: user.id }, { expiresIn: "7d" });

        // DB ga refresh token saqlaymiz
        user.refreshToken = refreshToken;
        await this.userRepository.save(user);

        return {
            accessToken,
            refreshToken,
            user,
        };
    }

    // ✅ Refresh token endpoint
    async refreshToken(oldRefreshToken: string) {
        if (!oldRefreshToken) throw new UnauthorizedException("No token provided");

        const payload = this.jwtService.verify<{ userId: string }>(oldRefreshToken);

        const user = await this.userRepository.findOne({ where: { id: payload.userId } });
        if (!user || user.refreshToken !== oldRefreshToken)
            throw new UnauthorizedException("Invalid refresh token");

        // Yangi tokenlar yaratamiz
        const accessToken = this.jwtService.sign({ userId: user.id });
        const refreshToken = this.jwtService.sign({ userId: user.id }, { expiresIn: "7d" });

        // DB ga yangilaymiz
        user.refreshToken = refreshToken;
        await this.userRepository.save(user);

        return {
            accessToken,
            refreshToken,
        };
    }

    // ✅ Validate user
    async validateUser(userId: string) {
        return this.userRepository.findOne({ where: { id: userId } });
    }
}
