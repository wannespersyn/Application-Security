import { ControlCenter } from "../../domain/model/controlCenter";
import {User} from "../../domain/model/user";


test(`given: valid values; when: control center is created; then: create control center`, () => {
    //given

    //when
    const controlCenter = new ControlCenter();
    
    //then
    expect(controlCenter.users).toEqual([new User({id: 0, name: "admin", admin: true, password: "Admin123!"})]);
    expect(controlCenter.light_sources).toEqual([]);
    expect(controlCenter.scenes).toEqual([]);
})