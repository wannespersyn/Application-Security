import { User } from "../model/user";

//preliminary database
const users = [];

const createUser = ({ name, password}: User): User => {
    //call constructor to validate
    const validation_user = new User({
        name, 
        password
    })
    users.push(validation_user);
    return null;
};

const getAllUsers = (): User[] => users;

export default {
    createUser,
    getAllUsers
}