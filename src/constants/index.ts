//* ***************** specify constant variable ****************(EX. const TEST_USER="test user")

export const errorMessage = {
  'string.base': '{#label} should be a type of text',
  'string.min': '{#label} should have a minimum length of {#limit}',
  'string.empty': '{#label} is not allowed to be empty',
  'string.max': '{#label} should be maximum {#limit} characters..',
  'string.pattern.base': 'Please enter valid {#label}',
  'any.required': '{#label} is a required field',
};

// *************** all file types ************
export const IMAGE_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

// ************* hear we define all filed's name which contain file ***********
export const FILE_FIELD_NAME_OBJ = {
  profile: {
    directory: '/images/profile',
    size: 1024 * 1024 * 2, // 2 mb
    fileTypes: [...IMAGE_FILE_TYPES],
  },
};

export enum DEFAULT_ROLES {
  ADMIN = 'admin',
  USER = 'user',
}
