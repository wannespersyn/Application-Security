import {
    User as UserPrisma
} from '@prisma/client';   

export class User {

    readonly name: string;
    readonly password: string;
    readonly admin: boolean
    readonly id: number;

    constructor (user: {id: number, name: string, password: string, admin: boolean}) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.admin = user.admin;
    }

    validate (user: { name: string, password: string, admin: boolean}) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!passwordRegex.test(user.password)) {
            throw new Error("Password does not meet the criteria.")
        }
    }

    static from({ 
        id,
        name,
        password, 
        admin
    }: UserPrisma ): User {
        return new User({
            id,
            name,
            password,
            admin
        })
    }

    

}