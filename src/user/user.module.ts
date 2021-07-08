import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Game } from '../database/entities/game.entity';
import { User } from '../database/entities/user.entity';
import { GameRepository } from '../database/repository/game.repository';
import { UserRepository } from '../database/repository/user.repository';
import { UserService } from './service/user.service';

@Module({
    imports: [ConfigModule.forRoot({ envFilePath: '.env' }),TypeOrmModule.forFeature([User, Game, UserRepository, GameRepository])],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
