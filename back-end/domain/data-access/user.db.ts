import { User } from "../model/user";

//preliminary database
const users = [];

const createUser = ({ name, password, admin}: User): User => {
    //call constructor to validate
    const validation_user = new User({
        name, 
        password,
        admin
    })
    users.push(validation_user);
    return null;
};

const getAllUsers = (): User[] => users;

export default {
    createUser,
    getAllUsers
}