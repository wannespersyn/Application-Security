import userDb from "../../domain/data-access/user.db";
import { User } from "../../domain/model/user";
import userService from "../../service/user.service";

const validName = "Wannes Persyn";
const validPassword = "Test1234";

let mockUserDbCreateUser: jest.SpyInstance<User, [User], any>;

beforeEach(() => {
    mockUserDbCreateUser = jest.spyOn(userDb, 'createUser');
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: a valid user; when: user is created; then: schedule is created with those values`, () => {
    //given

    //when
    userService.createUser({name: validName, password: validPassword, admin: false})

    //then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(new User({name: validName, password: validPassword, admin:false}));
})