import * as Joi from 'joi';

export const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
})