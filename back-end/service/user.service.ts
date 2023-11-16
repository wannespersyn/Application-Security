import userDb from "../domain/data-access/user.db";
import { User } from "../domain/model/user";
import { UserInput } from "../types";

let currentId = 1;

const createUser = ({name, password, admin}: UserInput): User => { 
    const user = new User({id: currentId++, name, password, admin});
    userDb.createUser(user);
    return user;
};

export default {
    createUser
};