import { User } from "../../domain/model/user";

const validName = "Wannes";
const validPassword = "yB8=2\JaX{c2"

test(`given: valid value for name and password; when: user is created; then: fields are undefined`, () => {
    //given

    //when
    const user = new User({
        name: validName,
        password: validPassword
    });

    //then
    expect(user.name).toEqual(validName);
    expect(user.password).toEqual(validPassword);
})