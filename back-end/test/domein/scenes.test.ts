import { LightSource } from "../../domain/model/lightSource";
import { Scene} from "../../domain/model/scene";

const validName = "watching tv";
const validActivationTargets = [
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

test(`given: valid value for name and lightSources; when: scene is created; then: scene is created`, () => {
    //given

    //when
    const scene = new Scene({
        id: 1,
        name: validName,
        lightSources: validActivationTargets
    });

    //then
    expect(scene.name).toEqual(validName);
    expect(scene.lightSources).toEqual(validActivationTargets);
})

test(`given: lightSources has 2x the same light source; when: scene is created; then: throw error`, () => {
    //given
    const invalidActivationTargets = [
        new LightSource({
            id: 1,
            name: "Light 1",
            location: "Living",
            brightness: 100,
            status: true
        }),
        new LightSource({
            id: 2,
            name: "Light 1",
            location: "Living",
            brightness: 10,
            status: true
        })
        
    ] 

    //when
    const CreateNewScene = () => 
        new Scene({
            id: 2,
            name: validName,
            lightSources: invalidActivationTargets
        });
    
    //then
    expect(CreateNewScene).toThrowError("Duplicate light source found!");
})