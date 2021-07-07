import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

import { RegisterUserDto } from "../../auth/presentation/dto/registerUser.dto";

@Injectable()
export class UserDtoValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}
    transform(value: RegisterUserDto, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if(error) throw new BadRequestException(`${error}`);
        return value;
    }
}