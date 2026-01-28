import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto  {
    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(24)
    @MinLength(4)
    username: string;

    @IsString()
    @MaxLength(16)
    @MinLength(8)
    password: string;
}