import bcrypt from 'bcrypt';

//hasheo de password
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//validacion del password hasheado
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);