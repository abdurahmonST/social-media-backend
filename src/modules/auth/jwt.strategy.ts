import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

interface JwtPayload {
    userId: string;
    iat?: number;
    exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'minifacebooksecretkey0088', // env faylga olish tavsiya qilinadi
        });
    }

    async validate(payload: JwtPayload) {
        return this.authService.validateUser(payload.userId);
    }
}
