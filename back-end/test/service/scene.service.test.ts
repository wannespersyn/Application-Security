import {LightSource} from "../../domain/model/lightSource";
import {Scene} from "../../domain/model/scene";
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

let mockSceneDbCreateScene: jest.Mock;


beforeEach( () => {
    mockSceneDbCreateScene = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: a valid scene; when: scene is created; then: scene is created with those values`, () => {
    //given

    //when
    sceneService.createScene({
        name: validName,
        lightSources: validActivationTargets
    })

    //then
    expect(mockSceneDbCreateScene).toHaveBeenCalledTimes(1);
    expect(mockSceneDbCreateScene).toHaveBeenCalledWith(
        new Scene(({
            id: 1,
            name: validName,
            lightSources: validActivationTargets
        }))
    );
})
