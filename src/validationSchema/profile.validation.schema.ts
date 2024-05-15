import Joi from 'joi';
import { joiCommon } from './common.validation';

export const createProfileSchema = Joi.object({
  firstName: joiCommon.joiString.label('First Name').required(),
  lastName: joiCommon.joiString.label('Last Name').required(),
  age: joiCommon.joiNumber.label('Age').required(),
  hobbies: joiCommon.joiArray.items(joiCommon.joiString).label('Hobbies').required(),
  gender: joiCommon.joiString.label('Gender').required(),
  country: joiCommon.joiString.label('Country').required(),
  state: joiCommon.joiString.label('State').required(),
  city: joiCommon.joiString.label('City').required(),
}).options({
  abortEarly: false,
});

export const getProfileListSchema = Joi.object({
  page: joiCommon.joiNumber.label('Page').optional(),
  pageSize: joiCommon.joiNumber.label('Page size').optional(),
}).options({
  abortEarly: false,
});
