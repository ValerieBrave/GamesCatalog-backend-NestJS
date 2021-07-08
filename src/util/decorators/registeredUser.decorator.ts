import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { LoginUserDto } from "src/auth/presentation/dto/loginUser.dto";

export const RegisteredUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): LoginUserDto => {
        const request = ctx.switchToHttp().getRequest();
        return {
            email: request.body.email,
            password: request.body.password,
        }
    }
)