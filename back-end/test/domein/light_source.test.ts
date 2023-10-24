import { LightSource } from "../../domain/model/lightSource";

const validName = "light right";
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