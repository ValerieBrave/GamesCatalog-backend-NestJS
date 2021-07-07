import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { UserRepository } from "src/database/repository/user.repository";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: UserRepository) {}

    async isEmailTaken(email: string) {
        const user = await this.userRepository.findByEmail(email);
        return user==undefined? false : true;
    }
}