
export class User {

    readonly name: string;
    readonly password: string;
    readonly id: number;
    readonly isAdmin: false;
    readonly rechten: [];

    constructor (user: {
        name: string, 
        password: string,
    }) {
        this.name = user.name;
        this.password = user.password;
        this.isAdmin;
    }

}