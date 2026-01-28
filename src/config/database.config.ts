import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Post } from "src/modules/post/entities/post.entity";
import { User } from "src/modules/user/entities/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'abdurahmon0088',
    database: process.env.DB_NAME || 'mini_facebook_db',
    entities: [User, Post],
    synchronize: true,
}