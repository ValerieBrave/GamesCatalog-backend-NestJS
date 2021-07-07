import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RegisterUserDto } from "src/auth/presentation/dto/registerUser.dto";

export const NewUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): RegisterUserDto => {
        const request = ctx.switchToHttp().getRequest();
        return {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        }
    }
)