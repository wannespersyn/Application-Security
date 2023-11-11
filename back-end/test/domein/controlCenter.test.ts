import exp from "constants";
import { ControlCenter } from "../../domain/model/controlCenter";
import { LightSource } from "../../domain/model/lightSource";
import { Scene } from "../../domain/model/scene";
import { User } from "../../domain/model/user";

const validUsers = [
    new User({name: "Wannes Persyn", password: "Test1234"}),
    new User({name: "Wannes Test", password: "Test1234"})
];

const validLightSources = [
    new LightSource({name: "Living table", location: "Living", brightness: 0, status: true}),
    new LightSource({name: "background tv", location: "Living", brightness: 0, status: true}),
    new LightSource({name: "toilet downstairs", location: "toilet", brightness: 0, status: true})
];

const validScenes = [
    new Scene({name: "tv night", activationTargets: [validLightSources[1]]}),
    new Scene({name: "dinner", activationTargets: [validLightSources[0]]})
];

test(`given: valid values; when: control center is created; then: create control center`, () => {
    //given

    //when
    const controlCenter = 
        new ControlCenter({
            users: validUsers,
            light_sources: validLightSources,
            scenes: validScenes
        });
    
    //then
    expect(controlCenter.users).toEqual(validUsers);
    expect(controlCenter.light_sources).toEqual(validLightSources);
    expect(controlCenter.scenes).toEqual(validScenes);
})