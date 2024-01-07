import sceneDb from "../../domain/data-access/scene.db";
import {LightSource} from "../../domain/model/lightSource";
import {Scene} from "../../domain/model/scene";
import sceneService from "../../service/scene.service";

const validName = "watching tv";
const validActivationTargets = [
    new LightSource({
        name: "Light 1",
        location: "Living",
        brightness: 50,
        status: false
    }),
    new LightSource({
        name: "Light 3",
        location: "Living",
        brightness: 100,
        status: false
    })
]

let mockSceneDbCreateScene: jest.Mock;


beforeEach( () => {
    mockSceneDbCreateScene = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: a valid scene; when: scene is created; then: scene is created with those values`, () => {
    //given
    sceneDb.createScene = mockSceneDbCreateScene;

    //when
    sceneService.createScene({
        name: validName,
        lightSources: validActivationTargets
    })

    //then
    expect(mockSceneDbCreateScene).toHaveBeenCalledTimes(1);
    expect(mockSceneDbCreateScene).toHaveBeenCalledWith(
        new Scene(({
            name: validName,
            lightSources: validActivationTargets
        }))
    );
})
