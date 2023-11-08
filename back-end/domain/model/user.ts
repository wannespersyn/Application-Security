
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
        this.validation(user);

        this.name = user.name;
        this.password = user.password;
    }

    /**
     * validator
     * 
     * @param user 
     */
    validation (user: { name, password}) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!passwordRegex.test(user.password)) {
            throw new Error("Password does not meet the criteria.")
        }
    }

}