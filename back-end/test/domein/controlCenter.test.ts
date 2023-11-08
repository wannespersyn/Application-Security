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
    new LightSource({name: "Living table", location: "Living", brightness: 0}),
    new LightSource({name: "background tv", location: "Living", brightness: 0}),
    new LightSource({name: "toilet downstairs", location: "toilet", brightness: 0})
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

test(`given: add excisting user; when: control center is created; then: error is thrown`, () => {
    //given
    const controlCenter = new ControlCenter({
        users: validUsers,
        light_sources: validLightSources,
        scenes: validScenes
    });

    //when
    const addUser = () => controlCenter.addUserToControlCenter(validUsers[0]);
    
    //then
    expect(addUser).toThrowError("User is already in control center!");
})

test(`given: add excisting light source; when: control center is created; then: error is thrown`, () => {
    //given
    const controlCenter = new ControlCenter({
        users: validUsers,
        light_sources: validLightSources,
        scenes: validScenes
    });

    //when
    const addLightSource = () => controlCenter.addLightSourceToControlCenter(validLightSources[0]);
    
    //then
    expect(addLightSource).toThrowError("Light source is already in control center!");
})

test(`given: add excisting scene; when: control center is created; then: error is thrown`, () => {
    //given
    const controlCenter = new ControlCenter({
        users: validUsers,
        light_sources: validLightSources,
        scenes: validScenes
    });

    //when
    const addScene = () => controlCenter.addScenesToControlCenter(validScenes[0]);
    
    //then
    expect(addScene).toThrowError("Scene is already in control center!");
})