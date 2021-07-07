import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Game } from './entities/game.entity';
import { User } from './entities/user.entity';
import { GameRepository } from './repository/game.repository';
import { UserRepository } from './repository/user.repository';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            entities: [User, Game],
            synchronize: true,
        })
    ],
    exports: [TypeOrmModule.forFeature([User, Game, UserRepository, GameRepository])],
    providers: [UserRepository, GameRepository]
})
export class DatabaseModule {}
