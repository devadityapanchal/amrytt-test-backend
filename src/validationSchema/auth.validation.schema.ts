import Joi from 'joi';
import { joiCommon } from './common.validation';

export const loginSchema = Joi.object({
  email: joiCommon.joiEmail.label('Email').required(),
  password: Joi.string().label('Password').required(),
}).options({
  abortEarly: false,
});

export const registerSchema = Joi.object({
  firstName: joiCommon.joiString.label('First Name').required(),
  lastName: joiCommon.joiString.label('Last Name').required(),
  email: joiCommon.joiEmail.label('Email').required(),
  password: joiCommon.joiString.label('Password').required(),
}).options({
  abortEarly: false,
});
