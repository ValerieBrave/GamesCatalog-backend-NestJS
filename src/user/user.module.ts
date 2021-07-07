import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserRepository } from '../database/repository/user.repository';
import { UserService } from './service/user.service';

@Module({
    imports: [DatabaseModule],
    providers: [UserService, UserRepository]
})
export class UserModule {}
