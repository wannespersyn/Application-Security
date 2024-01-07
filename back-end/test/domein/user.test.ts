import User from "../../domain/model/user";

const validName = "Wannes Persyn";
const validPassword = "yB8=2\JaX{c2"

test(`given: valid value for name and password; when: user is created; then: fields are undefined`, () => {
    //given

    //when
    const user = new User({
        name: validName,
        password: validPassword,
        admin: false
    });

    //then
    expect(user.name).toEqual(validName);
    expect(user.password).toEqual(validPassword);
})

test(`giver: invalid password; when: user is created; then: an error is thrown`, () => {
    //given
    const invalidPassword = "     ";

    //when
    const CreateNewUser = () =>
        new User({
            name: validName,
            password: invalidPassword,
            admin: false
        });

    //then
    expect(CreateNewUser).toThrowError('Password is required!');
})

test(`giver: invalid name; when: user is created; then: an error is thrown`, () => {
    //given
    const invalidName = "     ";

    //when
    const CreateNewUser = () =>
        new User({
            name: invalidName,
            password: validPassword,
            admin: false
        });

    //then
    expect(CreateNewUser).toThrowError('Name is required!');
})