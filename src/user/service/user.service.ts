import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "../../database/entities/user.entity";
import { UserRepository } from "../../database/repository/user.repository";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: UserRepository) {}

    async isEmailTaken(email: string) {
        const user = await this.userRepository.findByEmail(email);
        return user==undefined? false : true;
    }

    async getUserGames(id: number) {
        const user = await this.userRepository.findOne({where:{id:id}, relations:['games']});
        return user.games.map(e => e.id);
    }
    
}