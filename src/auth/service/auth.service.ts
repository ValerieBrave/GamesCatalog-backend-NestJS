import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserService } from "../../user/service/user.service";
import { User } from "../../database/entities/user.entity";
import { UserRepository } from "../../database/repository/user.repository";
import { RegisterUserDto } from "../presentation/dto/registerUser.dto";


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: UserRepository,
                                        private userService: UserService) {}

    async register(candidate: RegisterUserDto) {
        const taken: boolean = await this.userService.isEmailTaken(candidate.email);
        if(taken) throw new ConflictException();
        const user = await new User().createUser(candidate.name, candidate.email, candidate.password);
        return await this.userRepository.save(user);
    }
}