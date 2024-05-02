import Joi from 'joi';

const userSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    roles: Joi.array().items(Joi.string()).min(1).required()
});

export default userSchema;
