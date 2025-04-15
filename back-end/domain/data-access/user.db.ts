import database from "../../util/database";
import { User } from "../model/user";


const createUser = async ({ name, password, admin }: User): Promise<User> => {
    try {
        const newUserPrisma = await database.user.create({
            data: {
                name: name,
                password: password,
                admin: admin,
                controlCenter: {
                    connect: { id: 435 }
                }  
            }
        });
        return User.from(newUserPrisma);
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);;
    }   
    
};

const deleteUser = async (name: string): Promise<User> => {
    try {
        const userPrisma = await database.user.delete({
            where: {
                name: name
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}




export default {
    createUser,
    deleteUser
}