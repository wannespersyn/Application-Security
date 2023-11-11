import userDb from "../domain/data-access/user.db";
import { User } from "../domain/model/user";
import { UserInput } from "../types";

const createUser = ({name, password, admin}: UserInput): User => {
    const user = new User({name, password, admin});
    return userDb.createUser(user);
};

export default {
    createUser
};