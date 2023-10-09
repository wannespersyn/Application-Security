import { User } from "../model/user";

//voorlopige database
const users = [];

const createUser = ({ name, password}: User): User => {
    //constructor oproepen om de user te valideren
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