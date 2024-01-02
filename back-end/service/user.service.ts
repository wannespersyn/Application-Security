import userDb from "../domain/data-access/user.db";
import { User } from "../domain/model/user";
import { UserInput } from "../types";

const createUser = ({name, password, admin}: UserInput): User => { 
    const user = new User({name, password, admin});
    userDb.createUser(user);
    return user;
};

const deleteUser = (name: string): Promise<User> => {
    const user = userDb.deleteUser(name);
    return user;
}

export default {
    createUser,
    deleteUser
};