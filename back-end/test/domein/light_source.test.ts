import { LightSource } from "../../domain/model/lightSource";

const validName = "light table";
const validLocation = "Living";
const validBrightness = 100;

test(`given: valid value for name; when: light source is created; then: light source is created`, () => {
    //given

    //when
    const light_source = new LightSource({
        id: 1,
        name: validName,
        location: validLocation,
        brightness: validBrightness,
        status: true
    });

    //then
    expect(light_source.name).toEqual(validName)
})

test(`given: brightness to high; when: light source is created; then: throw error`, () => {
    //given
    const invalidBrightness = 200;

    //when
    const CreateNewLightSource = () =>
        new LightSource({
            id: 2,
            name: validName,
            location: validLocation,
            brightness: invalidBrightness,
            status: true
        });

    //then
    expect(CreateNewLightSource).toThrowError("Invalid brightness! Brightness has to be between 0 - 100");
})

test(`given: brightness to low; when: light source is created; then: throw error`, () => {
    //given
    const invalidBrightness = -5;

    //when
    const CreateNewLightSource = () =>
        new LightSource({
            id: 3,
            name: validName,
            location: validLocation,
            brightness: invalidBrightness,
            status: true
        });
    
    //then
    expect(CreateNewLightSource).toThrowError("Invalid brightness! Brightness has to be between 0 - 100");
})