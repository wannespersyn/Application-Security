import {User} from "../../domain/model/user";
import {LightSource} from "../../domain/model/lightSource";
import {Scene} from "../../domain/model/scene";
import {ControlCenter} from "../../domain/model/controlCenter";
import controlCenterDb from "../../domain/data-access/controlCenter.db";
import controlCenterService from "../../service/controlCenter.service";

const validUsers = [
    new User({
        id: 1,
        name: "Wannes Persyn",
        password: "WannesPS456!",
        admin: true
    }),
    new User({
        id: 2,
        name: "Timo De Winter",
        password: "TimoDW123#",
        admin: true
    }),
    new User({
        id: 3,
        name: "test",
        password: "Test123!",
        admin: false
    })
]

const validLightSources = [
    new LightSource({
        id: 1,
        name: "Light 1",
        location: "Living",
        brightness: 50,
        status: false
    }),
    new LightSource({
        id: 2,
        name: "Light 3",
        location: "Living",
        brightness: 100,
        status: false
    }),
    new LightSource({
        id: 3,
        name: "Light upstairs",
        location: "WC",
        brightness: 100,
        status: false
    }),
]

const validScenes = [
    new Scene({
        id: 1,
        name: "watching tv",
        activationTargets: [
            validLightSources[0],
            validLightSources[1]
        ]
    }),
    new Scene({
        id: 2,
        name: "sleeping",
        activationTargets: [
            validLightSources[0],
            validLightSources[1],
            validLightSources[2]
        ]
    })
]

let mockControlCenterDbCreateControlCenter: jest.SpyInstance<ControlCenter, []>;

beforeEach( () => {
    mockControlCenterDbCreateControlCenter = jest.spyOn(controlCenterDb, 'createControlPanel')
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: a valid control center; when: control panel is created; then: control panel is created with those values`, () => {
    //given

    //when
    controlCenterService.createControlCenter()

    //then
    expect(mockControlCenterDbCreateControlCenter).toHaveBeenCalledTimes(1);
    expect(mockControlCenterDbCreateControlCenter).toHaveBeenCalledWith(new ControlCenter());
})

test(`given: a valid user; when: user is added; then: user is added with those values`, () => {
    //given
    const user = new User({
        id: 4,
        name: "New User",
        password: "AGoodPassword1468!?",
        admin: false
    });

    //when
    controlCenterService.createControlCenter();
    const result = controlCenterService.addUserToControlCenter(user);

    //then
    expect(mockControlCenterDbCreateControlCenter).toHaveBeenCalledTimes(1);
    expect(mockControlCenterDbCreateControlCenter).toHaveBeenCalledWith();

    expect(result).toEqual(user);
});

test(`given: a user with an existing name; when: user is added; then: error is thrown`, () => {
    //given
    const invalidUser = new User({
        id: 5,
        name: "Wannes Persyn",
        password: "WannesPS456!",
        admin: true
    });

    //when
    controlCenterService.createControlCenter();
    const result = () => controlCenterService.addUserToControlCenter(invalidUser);

    //then
    expect(result).toThrowError(`User already in use: '${invalidUser.name}'`);
});

test(`given: a valid light source; when: light source is added; then: light source is added with those values`, () => {
    //given
    const newLightSource = new LightSource({
        id: 4,
        name: "Light downstairs",
        location: "WC",
        brightness: 100,
        status: false
    })

    //when
    controlCenterService.createControlCenter();
    const result = controlCenterService.addLightSource(newLightSource);

    //then
    expect(mockControlCenterDbCreateControlCenter).toHaveBeenCalledTimes(1);
    expect(mockControlCenterDbCreateControlCenter).toHaveBeenCalledWith(
        expect.objectContaining({
            users: validUsers,
            light_sources: expect.arrayContaining([...validLightSources, newLightSource]),
            scenes: validScenes
        })
    );

    expect(result).toEqual(newLightSource);
});

test(`given: a light source with an existing name and location; when: light source is added; then: error is thrown`, () => {
    //given
    const invalidLightSource = new LightSource({
        id: 5,
        name: "Light upstairs",
        location: "WC",
        brightness: 100,
        status: false
    })

    //when
    controlCenterService.createControlCenter();
    const result = () => controlCenterService.addLightSource(invalidLightSource);

    //then
    expect(result).toThrowError(`Light source with location: '${invalidLightSource.location}' and 
                                    name: '${invalidLightSource.name}' already in use!`);
});


test(`given: a valid scene; when: scene is added; then: scene is added with those values`, () => {
     //given
     const newScene = new Scene({
         id: 3,
         name: "cooking",
         activationTargets: [
             validLightSources[0],
             validLightSources[1]
         ]
     })

     //when
     controlCenterService.createControlCenter();
     const result = controlCenterService.addScene(newScene);

     //then
     expect(mockControlCenterDbCreateControlCenter).toHaveBeenCalledTimes(1);
     expect(mockControlCenterDbCreateControlCenter).toHaveBeenCalledWith(
         expect.objectContaining({
             users: validUsers,
             light_sources: validLightSources,
             scenes: expect.arrayContaining([
                 ...validScenes,
                 expect.objectContaining({
                     id: newScene.id,
                     name: newScene.name,
                     activationTargets: newScene.activationTargets
                 })
             ])
         })
     );

     expect(result).toEqual(newScene);
 });

test(`given: a scene with an existing name and ; when: scene is added; then: error is thrown`, () => {
    //given
    const invalidScene = new Scene({
        id: 4,
        name: "watching tv",
        activationTargets: [
            validLightSources[0],
            validLightSources[1]
        ]
    })

    //when
    controlCenterService.createControlCenter();
    const result = () => controlCenterService.addScene(invalidScene);

    //then
    expect(result).toThrowError(`Scene with name: '${invalidScene.name}' already in exist!`);
});