import {LightSource} from "../../domain/model/lightSource";
import {Scene} from "../../domain/model/scene";
import sceneDb from "../../domain/data-access/scene.db";
import sceneService from "../../service/scene.service";

const validName = "watching tv";
const validActivationTargets = [
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
    })
]

let mockSceneDbCreateScene: jest.SpyInstance<Scene, [Scene]>;
let mockSceneDbTurnSceneOn: jest.SpyInstance<Scene, [string]>;
let mockSceneDbTurnSceneOff: jest.SpyInstance<Scene, [string]>;



beforeEach( () => {
    mockSceneDbCreateScene = jest.spyOn(sceneDb, 'createScene');
    mockSceneDbTurnSceneOn = jest.spyOn(sceneDb, 'turnSceneOn');
    mockSceneDbTurnSceneOff = jest.spyOn(sceneDb, 'turnSceneOff');
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: a valid scene; when: scene is created; then: scene is created with those values`, () => {
    //given

    //when
    sceneService.createScene({
        name: validName,
        activationTargets: validActivationTargets
    })

    //then
    expect(mockSceneDbCreateScene).toHaveBeenCalledTimes(1);
    expect(mockSceneDbCreateScene).toHaveBeenCalledWith(
        new Scene(({
            id: 1,
            name: validName,
            activationTargets: validActivationTargets
        }))
    );
})

test(`given: a valid scene; when: scene is turned on; then: activation targets are turned on`, () => {
    //given

    //when
    sceneService.createScene({
        name: validName,
        activationTargets: validActivationTargets
    })

    const result = sceneService.turnSceneOn(validName);

    //then
    expect(mockSceneDbTurnSceneOn).toHaveBeenCalledTimes(1);
    expect(mockSceneDbTurnSceneOn).toHaveBeenCalledWith(validName);

    expect(result).toEqual({
        id: 1,
        name: validName,
        activationTargets: [
            new LightSource({
                id: 1,
                name: "Light 1",
                location: "Living",
                brightness: 50,
                status: true
            }),
            new LightSource({
                id: 2,
                name: "Light 3",
                location: "Living",
                brightness: 100,
                status: true
            })
        ]
    })
})

test(`given: a invalid scene; when: scene is turned on; then: error is thrown`, () => {
    //given
    const invalidName = "wrong";

    //when
    sceneService.createScene({
        name: validName,
        activationTargets: validActivationTargets
    })

    const result = () => sceneService.turnSceneOn(invalidName);

    //then
    expect(result).toThrowError(`Scene '${invalidName}' not found!`)
})

test(`given: a valid scene; when: scene is turned off; then: activation targets are turned off`, () => {
    //given

    //when
    sceneService.createScene({
        name: validName,
        activationTargets: validActivationTargets
    })

    const result = sceneService.turnSceneOff(validName);

    //then
    expect(mockSceneDbTurnSceneOff).toHaveBeenCalledTimes(1);
    expect(mockSceneDbTurnSceneOff).toHaveBeenCalledWith(validName);

    expect(result).toEqual({
        id: 1,
        name: validName,
        activationTargets: [
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
            })
        ]
    })
})

test(`given: a invalid scene; when: scene is turned off; then: error is thrown`, () => {
    //given
    const invalidName = "wrong";

    //when
    sceneService.createScene({
        name: validName,
        activationTargets: validActivationTargets
    })

    const result = () => sceneService.turnSceneOff(invalidName);

    //then
    expect(result).toThrowError(`Scene '${invalidName}' not found!`)
})