import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from 'src/auth/types/auth-user.type';
import { Request } from 'express';

export const User = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): AuthUser => {
        const request = ctx.switchToHttp().getRequest<Request>();
        if (!request.user) throw new Error('User not found on request');
        const { id, email, role } = request.user as AuthUser;
        return { id, email, role };
    },
);
