import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Request } from "express";
import { User } from "../user/entities/user.entity";

@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService
    ) {}

    @Post('signup')
    signup(@Body() dto: SignUpDto) {
        return this.service.signup(dto)
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.service.login(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('me')
    me(@Req() req: Request & { user: User }) {
        return req.user;
    }
}