import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/database/entities/game.entity';
import { User } from 'src/database/entities/user.entity';
import { GameRepository } from 'src/database/repository/game.repository';
import { jwtConfig } from 'src/util/config';

import { UserRepository } from '../database/repository/user.repository';
import { UserService } from '../user/service/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
    imports: [  ConfigModule.forRoot({ envFilePath: '.env' }),
                TypeOrmModule.forFeature([User, Game, UserRepository, GameRepository]),
                UserModule,
                JwtModule.register({secret: '123456'})],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})
export class AuthModule {}
