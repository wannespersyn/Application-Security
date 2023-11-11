import lightSourceDb from "../../domain/data-access/lightSource.db";
import {LightSource} from "../../domain/model/lightSource";
import lightSourceService from "../../service/lightSource.service";

const validName = "First Floor WC";
const validLocation = "WC"

let mockLightSourceDbCreateLightSource: jest.SpyInstance<LightSource, [LightSource], any>;
let mockLightSourceDbTurnLightOn: jest.SpyInstance<LightSource, [string], any>;
let mockLightSourceDbTurnLightOff: jest.SpyInstance<LightSource, [string], any>;
let mockLightSourceDbChangeBrightness: jest.SpyInstance<LightSource, [string, number], any>;

beforeEach( () => {
    mockLightSourceDbCreateLightSource = jest.spyOn(lightSourceDb, 'createLightSource')
    mockLightSourceDbTurnLightOn = jest.spyOn(lightSourceDb, 'turnLightOn');
    mockLightSourceDbTurnLightOff = jest.spyOn(lightSourceDb, 'turnLightOff');
    mockLightSourceDbChangeBrightness = jest.spyOn(lightSourceDb, 'changeBrightness');
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: a valid light source; when: light source is created; then: light source is created with those values`, () => {
    //given

    //when
    lightSourceService.createLightSource(
        {name: validName,
            location: validLocation,
            brightness: 0,
            status: false})

    //then
    expect(mockLightSourceDbCreateLightSource).toHaveBeenCalledTimes(1);
    expect(mockLightSourceDbCreateLightSource).toHaveBeenCalledWith(
        new LightSource(({
            name: validName,
            location: validLocation,
            brightness: 0,
            status: false
        }))
    );
})

test(`given: a valid light source name; when: turning the light on; then: the light source status should be true`, () => {
    // given

    // when
    const createdLightSource = lightSourceService.createLightSource(
        {name: validName,
            location: validLocation,
            brightness: 0,
            status: false
        })

    const result = lightSourceService.turnLightOn(validName);

    // then
    expect(mockLightSourceDbTurnLightOn).toHaveBeenCalledTimes(1);
    expect(mockLightSourceDbTurnLightOn).toHaveBeenCalledWith(validName);

    expect(result).toEqual({
            "brightness": 0,
            "location": validLocation,
            "name": validName,
            "status": true
        }
    );
});

test(`given: a invalid light source name; when: turning the light on; then: error is thrown`, () => {
    // given
    const invalidName = "wrong"

    // when
    const createdLightSource = lightSourceService.createLightSource(
        {name: validName,
            location: validLocation,
            brightness: 0,
            status: false
        })

    const result = () => lightSourceService.turnLightOn(invalidName);

    // then
    expect(result).toThrowError(`Light source '${invalidName}' not found!`)
});

test(`given: a valid light source name; when: turning the light off; then: the light source status should be false`, () => {
    // given

    // when
    const createdLightSource = lightSourceService.createLightSource(
        {name: validName,
            location: validLocation,
            brightness: 0,
            status: true
        })

    const result = lightSourceService.turnLightOff(validName);

    // then
    expect(mockLightSourceDbTurnLightOff).toHaveBeenCalledTimes(1);
    expect(mockLightSourceDbTurnLightOff).toHaveBeenCalledWith(validName);

    expect(result).toEqual({
            "brightness": 0,
            "location": validLocation,
            "name": validName,
            "status": false
        }
    );
});

test(`given: a invalid light source name; when: turning the light off; then: error is thrown`, () => {
    // given
    const invalidName = "wrong"

    // when
    const createdLightSource = lightSourceService.createLightSource(
        {name: validName,
            location: validLocation,
            brightness: 0,
            status: false
        })

    const result = () => lightSourceService.turnLightOff(invalidName);

    // then
    expect(result).toThrowError(`Light source '${invalidName}' not found!`)
});

test(`given: a valid light source name and brightness; when: changing brightness; then: the light source brightness should change`, () => {
    // given
    const validBrightness = 50;

    // when
    const createdLightSource = lightSourceService.createLightSource(
        {name: validName,
            location: validLocation,
            brightness: 0,
            status: true
        })

    const result = lightSourceService.changeBrightnessLight(validName, validBrightness);

    // then
    expect(mockLightSourceDbChangeBrightness).toHaveBeenCalledTimes(1);
    expect(mockLightSourceDbChangeBrightness).toHaveBeenCalledWith(validName, validBrightness);

    expect(result).toEqual({
            "brightness": 50,
            "location": validLocation,
            "name": validName,
            "status": true
        }
    );
});

test(`given: a invalid light source name & valid brightness; when: changing the brightness; then: error is thrown`, () => {
    // given
    const invalidName = "wrong"
    const validBrightness = 50;

    // when
    const createdLightSource = lightSourceService.createLightSource(
        {name: validName,
            location: validLocation,
            brightness: 0,
            status: false
        })

    const result = () => lightSourceService.changeBrightnessLight(invalidName, validBrightness);

    // then
    expect(result).toThrowError(`Light source '${invalidName}' not found!`)
});

test(`given: a valid light source name & invalid brightness; when: changing the brightness; then: error is thrown`, () => {
    // given
    const invalidBrightness = 150;

    // when
    const createdLightSource = lightSourceService.createLightSource(
        {name: validName,
            location: validLocation,
            brightness: 0,
            status: false
        })

    const result = () => lightSourceService.changeBrightnessLight(validName, invalidBrightness);

    // then
    expect(result).toThrowError("Brightness must be between 0 & 100 (inclusive)!")
});

test(`given: a valid light source name & invalid brightness; when: changing the brightness; then: error is thrown`, () => {
    // given
    const invalidBrightness = -10;

    // when
    const createdLightSource = lightSourceService.createLightSource(
        {name: validName,
            location: validLocation,
            brightness: 0,
            status: false
        })

    const result = () => lightSourceService.changeBrightnessLight(validName, invalidBrightness);

    // then
    expect(result).toThrowError("Brightness must be between 0 & 100 (inclusive)!")
});