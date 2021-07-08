import { Controller, Get, HttpCode, HttpStatus, Post, UseFilters, UsePipes } from "@nestjs/common";
import { HttpExceptionFilter } from "../../util/filters/httpError.filter";

import { User } from "../../database/entities/user.entity";
import { UserRepository } from "../../database/repository/user.repository";
import { NewUser } from "../../util/decorators/newUser.decorator";
import { RegisteredUser } from "../../util/decorators/registeredUser.decorator";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { UserDtoValidationPipe } from "../../util/pipes/registerUser-validation.pipe";
import { registerUserSchema } from "../../util/schemas/registerUser.schema";
import { AuthService } from "../service/auth.service";
import { LoginUserDto } from "./dto/loginUser.dto";
import { loginUserSchema } from "../../util/schemas/loginUser.schema";

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @UsePipes(new UserDtoValidationPipe(loginUserSchema))
    async loginUser(@RegisteredUser() user: LoginUserDto ) {
        const {token, likes} = await this.authService.login(user);
        return {token: token, likes: likes}
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new UserDtoValidationPipe(registerUserSchema))
    async registerUser(@NewUser() candidate: RegisterUserDto) {
        const ret = await this.authService.register(candidate);
        return ret;
    }
}