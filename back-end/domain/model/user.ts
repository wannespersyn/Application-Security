import {
    User as UserPrisma
} from '@prisma/client';   

export class User {

    readonly name: string;
    readonly password: string;
    readonly admin: boolean

    constructor (user: {name: string, password: string, admin: boolean}) {
        this.validate(user);
        
        this.name = user.name;
        this.password = user.password;
        this.admin = user.admin;
    }

    validate (user: {name: string, password: string, admin: boolean}) {
        if (!user.name?.trim()) {
            throw new Error("Name is required!");
        }
        if (!user.password?.trim()) {
            throw new Error("Password is required!");
        }
    }

    static from({ 
        name,
        password, 
        admin
    }: UserPrisma ): User {
        return new User({
            name,
            password,
            admin
        })
    }
}

export default User;