
export class User {

    readonly name: string;
    readonly password: string;
    readonly id: number;

    /**
     * constructor
     * 
     * @param user 
     */
    constructor (user: {name: string, password: string}) {
        this.name = user.name;
        this.password = user.password;
    }

}