import userDb from "../../domain/data-access/user.db";
import { User } from "../../domain/model/user";
import userService from "../../service/user.service";

const validName = "Wannes Persyn";
const validPassword = "Test1234";

let mockUserDbCreateUser: jest.Mock;

beforeEach(() => {
    mockUserDbCreateUser = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: a valid user; when: user is created; then: user is created with those values`, async () => {
    //given
    userDb.createUser = mockUserDbCreateUser;

    //when
    await userDb.createUser({name: validName, password: validPassword, admin: false, validate(user) {},});

    //then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(new User({name: validName, password: validPassword, admin:false}));
})