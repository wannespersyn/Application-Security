import database from "../../util/database";
import { User } from "../model/user";


const createUser = async ({ name, password, admin }: User): Promise<User> => {
    try {
        const newUserPrisma = await database.user.create({
            data: {
                name: name,
                password: password,
                admin: admin
            }
        });
        return User.from(newUserPrisma);
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);;
    }   
    
};




export default {
    createUser
}