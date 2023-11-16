import { User } from "../model/user";

//preliminary database
const users: User[] = [];

let currentId = 1;

const createUser = ({ name, password, admin }: User): User => {
    // Call constructor to validate
    const validation_user = new User({
        id: currentId++,
        name,
        password,
        admin
    });
    users.push(validation_user);
    return validation_user;
};


const getAllUsers = (): User[] => users;


export default {
    createUser,
    getAllUsers
}