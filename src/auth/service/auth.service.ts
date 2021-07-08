import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from '@nestjs/jwt';

import { UserService } from "../../user/service/user.service";
import { User } from "../../database/entities/user.entity";
import { UserRepository } from "../../database/repository/user.repository";
import { RegisterUserDto } from "../presentation/dto/registerUser.dto";
import { LoginUserDto } from "../presentation/dto/loginUser.dto";
import { jwtConfig } from "../../util/config";


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: UserRepository,
                                        private userService: UserService,
                                        private jwtService: JwtService) {}

    async register(candidate: RegisterUserDto) {
        const taken: boolean = await this.userService.isEmailTaken(candidate.email);
        
        if(taken) throw new ConflictException();
        const user = await new User().createUser(candidate.name, candidate.email, candidate.password);
        return await this.userRepository.save(user);
    }
    
    async login(user: LoginUserDto) {
        const candidate = await this.userRepository.findByEmail(user.email);
        if(candidate) {
            const match: boolean = await candidate.passwordsMatch(user.password);
            if(!match) throw new UnauthorizedException('Provided password is wrong');
            const token = this.jwtService.sign({email: candidate.email, userId: candidate.id});
            await this.userRepository.setNewToken(candidate.id, token);
            const likes = await this.userService.getUserGames(candidate.id);
            return {token, likes};
        } else throw new NotFoundException('User with provided email is not registered')
    }
}