import { LightSource } from "../../domain/model/lightSource";

const validName = "light table";
const validLocation = "Living";
const validBrightness = 100;

test(`given: valid value for name; when: light source is created; then: light source is created`, () => {
    //given

    //when
    const light_source = new LightSource({
        name: validName,
        location: validLocation,
        brightness: validBrightness
    });

    //then
    expect(light_source.name).toEqual(validName)
})

test(`given: brightness to high; when: lightsource is created; then: throw error`, () => {
    //given
    const invalidBrightness = 200;

    //when
    const CreateNewLightSource = () =>
        new LightSource({
            name: validName,
            location: validLocation,
            brightness: invalidBrightness
        });
    
    //then
    expect(CreateNewLightSource).toThrowError("Invalid brightness! Brightness has to be between 0 - 100");
})

test(`given: brightness to low; when: lightsource is created; then: throw error`, () => {
    //given
    const invalidBrightness = -5;

    //when
    const CreateNewLightSource = () =>
        new LightSource({
            name: validName,
            location: validLocation,
            brightness: invalidBrightness
        });
    
    //then
    expect(CreateNewLightSource).toThrowError("Invalid brightness! Brightness has to be between 0 - 100");
})