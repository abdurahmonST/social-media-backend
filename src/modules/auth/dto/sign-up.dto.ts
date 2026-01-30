import { IsEmail, IsNotEmpty, MinLength, IsOptional } from "class-validator";

export class SignUpDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsNotEmpty()
    username: string;

    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastName?: string;
}
