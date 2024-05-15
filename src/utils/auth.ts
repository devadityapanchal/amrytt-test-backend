import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
