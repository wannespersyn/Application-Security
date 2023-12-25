import {User} from "../../domain/model/user";
import {LightSource} from "../../domain/model/lightSource";
import {Scene} from "../../domain/model/scene";
import {ControlCenter} from "../../domain/model/controlCenter";
import controlCenterDb from "../../domain/data-access/controlCenter.db";
import controlCenterService from "../../service/controlCenter.service";
import lightSourceDb from "../../domain/data-access/lightSource.db";
import lightSourceService from "../../service/lightSource.service";

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
        lightSources: [
            validLightSources[0],
            validLightSources[1]
        ]
    }),
    new Scene({
        id: 2,
        name: "sleeping",
        lightSources: [
            validLightSources[0],
            validLightSources[1],
            validLightSources[2]
        ]
    })
]

let mockControlCenterDbCreateControlCenter: jest.Mock
let mockControlCenterDbAddLightSource: jest.Mock
let mockControlCenterDbTurnLightOn: jest.Mock
let mockControlCenterDbTurnLightOff:jest.Mock
let mockControlCenterDbChangeBrightness: jest.Mock
let mockControlCenterDbAddScene: jest.Mock


beforeEach( () => {
    mockControlCenterDbCreateControlCenter = jest.fn()
    mockControlCenterDbAddLightSource = jest.fn()
    
    mockControlCenterDbTurnLightOn = jest.fn()
    mockControlCenterDbTurnLightOff = jest.fn()
    mockControlCenterDbChangeBrightness = jest.fn()

    mockControlCenterDbAddScene = jest.fn()
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
    expect(mockControlCenterDbCreateControlCenter).toHaveBeenCalledWith();
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
    controlCenterService.addUserToControlCenter(validUsers[0])
    const result = () => controlCenterService.addUserToControlCenter(invalidUser);

    //then
    expect(result).toThrowError(`User already in use: '${invalidUser.name}'`);
});

test(`given: a valid light source; when: light source is added; then: light source is added with those values`, () => {
    //given
    const newLightSource = new LightSource({
        id: 1,
        name: "Light downstairs",
        location: "WC",
        brightness: 100,
        status: false
    })

    //when
    controlCenterService.createControlCenter();
    const result = controlCenterService.addLightSource(newLightSource);

    //then
    expect(mockControlCenterDbAddLightSource).toHaveBeenCalledTimes(1);
    expect(mockControlCenterDbAddLightSource).toHaveBeenCalledWith(newLightSource)

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
    controlCenterService.addLightSource(validLightSources[2])
    const result = () => controlCenterService.addLightSource(invalidLightSource);

    //then
    expect(result).toThrowError(`Light source with location: '${invalidLightSource.location}' and 
                                    name: '${invalidLightSource.name}' already in use!`);
});


test(`given: a valid scene; when: scene is added; then: scene is added with those values`, () => {
     //given
     const newScene = new Scene({
         id: 1,
         name: "cooking",
         lightSources: [
             validLightSources[0],
             validLightSources[1]
         ]
     })

     //when
     controlCenterService.createControlCenter();
     const result = controlCenterService.addScene(newScene);

     //then
     expect(mockControlCenterDbAddScene).toHaveBeenCalledTimes(1);
     expect(mockControlCenterDbAddScene).toHaveBeenCalledWith(newScene);

     expect(result).toEqual(newScene);
 });

test(`given: a scene with an existing name and ; when: scene is added; then: error is thrown`, () => {
    //given
    const invalidScene = new Scene({
        id: 4,
        name: "watching tv",
        lightSources: [
            validLightSources[0],
            validLightSources[1]
        ]
    })

    //when
    controlCenterService.createControlCenter();
    controlCenterService.addScene(validScenes[0])
    const result = () => controlCenterService.addScene(invalidScene);

    //then
    expect(result).toThrowError(`Scene with name: '${invalidScene.name}' already in exist!`);
});

test(`given: a valid light source name; when: turning the light on; then: the light source status should be true`, () => {
    // given

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])
    const result = controlCenterService.turnLightOn(validLightSources[0].name, validLightSources[0].location);

    // then
    expect(mockControlCenterDbTurnLightOn).toHaveBeenCalledTimes(1);
    expect(mockControlCenterDbTurnLightOn).toHaveBeenCalledWith(validLightSources[0].name, validLightSources[0].location);

    expect(result).toEqual({
            "id": 3,
            "brightness": validLightSources[0].brightness,
            "location": validLightSources[0].location,
            "name": validLightSources[0].name,
            "status": true
        }
    );
});

test(`given: a invalid light source name; when: turning the light on; then: error is thrown`, () => {
    // given
    const invalidName = "wrong"

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])

    const result = () => controlCenterService.turnLightOn(invalidName, validLightSources[0].location);

    // then
    expect(result).toThrowError(`Light source with name: '${invalidName}' and location: '${validLightSources[0].location} not found!`)
});

test(`given: a invalid light source location; when: turning the light on; then: error is thrown`, () => {
    // given
    const invalidLocation = "wrong"

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])

    const result = () => controlCenterService.turnLightOn(validLightSources[0].name, invalidLocation);

    // then
    expect(result).toThrowError(`Light source with name: '${validLightSources[0].name}' and location: '${invalidLocation} not found!`)
});


test(`given: a valid light source name; when: turning the light off; then: the light source status should be false`, async () => {
    // given

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])
    const result = await controlCenterService.turnLightOff(validLightSources[0].name, validLightSources[0].location);

    // then
    expect(mockControlCenterDbTurnLightOff).toHaveBeenCalledTimes(1);
    expect(mockControlCenterDbTurnLightOff).toHaveBeenCalledWith(validLightSources[0].name, validLightSources[0].location);

    expect(result.status).toEqual(false)
});

test(`given: a invalid light source name; when: turning the light off; then: error is thrown`, () => {
    // given
    const invalidName = "wrong"

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])

    const result = () => controlCenterService.turnLightOff(invalidName, validLightSources[0].location);

    // then
    expect(result).toThrowError(`Light source with name: '${invalidName}' and location: '${validLightSources[0].location} not found!`)
});

test(`given: a invalid light source location; when: turning the light off; then: error is thrown`, () => {
    // given
    const invalidLocation = "wrong"

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])

    const result = () => controlCenterService.turnLightOff(validLightSources[0].name, invalidLocation);

    // then
    expect(result).toThrowError(`Light source with name: '${validLightSources[0].name}' and location: '${invalidLocation} not found!`)
});

test(`given: a valid light source name and brightness; when: changing brightness; then: the light source brightness should change`, async () => {
    // given
    const validBrightness = 50;

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])
    const result = await controlCenterService.changeBrightnessLight(validLightSources[0].name, validLightSources[0].location, validBrightness);

    // then
    expect(mockControlCenterDbChangeBrightness).toHaveBeenCalledTimes(1);
    expect(mockControlCenterDbChangeBrightness).toHaveBeenCalledWith(validLightSources[0].name, validLightSources[0].location, validBrightness);

    expect(result.brightness).toEqual(validBrightness);
});

test(`given: a invalid light source name & valid brightness; when: changing the brightness; then: error is thrown`, () => {
    // given
    const invalidName = "wrong"
    const validBrightness = 50;

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])

    const result = () => controlCenterService.changeBrightnessLight(invalidName, validLightSources[0].location, validBrightness);

    // then
    expect(result).toThrowError(`Light source with name: '${invalidName}' and location: '${validLightSources[0].location} not found!`)
});

test(`given: a invalid light source location & valid brightness; when: changing the brightness; then: error is thrown`, () => {
    // given
    const invalidLocation = "wrong"
    const validBrightness = 50;

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])

    const result = () => controlCenterService.changeBrightnessLight(validLightSources[0].name, invalidLocation, validBrightness);

    // then
    expect(result).toThrowError(`Light source with name: '${validLightSources[0].name}' and location: '${invalidLocation} not found!`)
});

test(`given: a valid light source name & invalid brightness; when: changing the brightness; then: error is thrown`, () => {
    // given
    const invalidBrightness = 150;

    // when
    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])

    const result = () => controlCenterService.changeBrightnessLight(validLightSources[0].name, validLightSources[0].location, invalidBrightness);

    // then
    expect(result).toThrowError("Brightness must be between 0 & 100 (inclusive)!")
});

test(`given: a valid light source name & invalid brightness; when: changing the brightness; then: error is thrown`, () => {
    // given
    const invalidBrightness = -10;

    controlCenterService.createControlCenter();
    controlCenterService.addLightSource(validLightSources[0])

    const result = () => controlCenterService.changeBrightnessLight(validLightSources[0].name, validLightSources[0].location, -10);

    // then
    expect(result).toThrowError("Brightness must be between 0 & 100 (inclusive)!")
});