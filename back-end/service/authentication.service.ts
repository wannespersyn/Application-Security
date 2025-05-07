import bcrypt from 'bcryptjs';
import { AuthenticationResponse, UserInput } from '../types';
import { signToken } from '../util/jwt';
import controlCenterDb from '../domain/data-access/controlCenter.db';
import User from '../domain/model/user';

const pepper = process.env.PEPPER;

/**
 * Function to hash a password with a salt and a pepper
 * 
 * @param password 
 * @returns 
 */
const hashPassword = async (password: string): Promise<string> => {
  try {

    // Generate a salt + add pepper to the password
    const salt = await bcrypt.genSalt(12);
    const pepperedPassword = password + pepper;

    const hashedPassword = await bcrypt.hash(pepperedPassword, salt);
    return hashedPassword;

  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Error hashing password.');
  }
};


/**
 * Function to verify a password with a stored hashed password
 * 
 * @param enteredPassword 
 * @param storedHashedPassword 
 * @returns 
 */
const verifyPassword = async (enteredPassword: string, storedHashedPassword: string): Promise<boolean> => {
  try {

    // Add pepper to the entered password
    const pepperedPassword = enteredPassword + pepper;

    const match = await bcrypt.compare(pepperedPassword, storedHashedPassword);
    return match;

  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Error verifying password!');
  }
}

/**
 * Function to sign a token with a secret
 * 
 * @param param0 
 * @returns 
 */
const authenticate = async ({ name, password}: UserInput): Promise<AuthenticationResponse> => {
  const user = await controlCenterDb.findUserByName(name);

  if (!user) {
      throw new Error(`User with name: '${name}' not found!`);
  }
  
  const isvalidPassword = await verifyPassword(password, user.password);

  if (!isvalidPassword) {
      throw new Error("Password is incorrect!");
  }
  

  return {
      token: signToken({ name, admin: user.admin }),
      name: user.name,
      admin: user.admin
  };
}

const addUserToControlCenter = async ({name, password, admin }: UserInput): Promise<User> => {
    const excisting = await controlCenterDb.findUserByName(name);

    if (excisting) {
        throw new Error(`User with name: '${name}' already exists!`);
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({name, password: hashedPassword, admin});

    return await controlCenterDb.addUser(user);
}




export default {
    hashPassword,
    verifyPassword,
    authenticate,
    addUserToControlCenter
};