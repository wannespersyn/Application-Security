import { LightSource } from "../../domain/model/lightSource";
import { Scene} from "../../domain/model/scene";

const validName = "watching tv";
const validActivationTargets = [
    new LightSource({
        name: "Light 1",
        location: "Living",
        brightness: 50
    }),
    new LightSource({
        name: "Light 3",
        location: "Living",
        brightness: 100
    })
] 

test(`given: valid value for name and ActivationTargets; when: scene is created; then: scene is created`, () => {
    //given

    //when
    const scene = new Scene({
        name: validName,
        activationTargets: validActivationTargets
    });

    //then
    expect(scene.name).toEqual(validName);
    expect(scene.activationTargets).toEqual(validActivationTargets);
})

test(`given: activation targets has 2x the same lightsource; when: scene is created; then: thow error`, () => {
    //given
    const invalidActivationTargets = [
        new LightSource({
            name: "Light 1",
            location: "Living",
            brightness: 100
        }),
        new LightSource({
            name: "Light 1",
            location: "Living",
            brightness: 10
        })
        
    ] 

    //when
    const CreateNewScene = () => 
        new Scene({
            name: validName,
            activationTargets: invalidActivationTargets
        });
    
    //then
    expect(CreateNewScene).toThrowError("Duplicate light source found!");
})