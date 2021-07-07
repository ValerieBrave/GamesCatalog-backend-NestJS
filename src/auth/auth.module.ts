import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserRepository } from '../database/repository/user.repository';
import { UserService } from '../user/service/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
    imports: [DatabaseModule, UserModule],
    providers: [AuthService, UserService, UserRepository],
    controllers: [AuthController]
})
export class AuthModule {}
