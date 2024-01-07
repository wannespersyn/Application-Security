import { ControlCenter } from "../../domain/model/controlCenter";
import {User} from "../../domain/model/user";


test(`given: valid values; when: control center is created; then: create control center`, () => {
    //given

    //when
    const controlCenter = new ControlCenter("Home Control Center");
    
    //then
    expect(controlCenter.name).toEqual("Home Control Center");
    expect(controlCenter.light_sources).toEqual([]);
    expect(controlCenter.scenes).toEqual([]);
})