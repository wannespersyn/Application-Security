
export class User {

    readonly name: string;
    readonly password: string;
    readonly admin: boolean
    readonly id: number;

    /**
     * constructor
     * 
     * @param user 
     */
    constructor (user: {id: number, name: string, password: string, admin: boolean}) {
        this.validation(user);

        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.admin = user.admin;
    }

    /**
     * validator
     * 
     * @param user 
     */
    validation (user: { name: string, password: string, admin: boolean}) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!passwordRegex.test(user.password)) {
            throw new Error("Password does not meet the criteria.")
        }
    }

}