import lightSourceDb from "../../domain/data-access/lightSource.db";
import {LightSource} from "../../domain/model/lightSource";
import lightSourceService from "../../service/lightSource.service";

const validName = "First Floor WC";
const validLocation = "WC"

let mockLightSourceDbCreateLightSource: jest.Mock;

beforeEach( () => {
    mockLightSourceDbCreateLightSource = jest.fn();
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
            id: 1,
            name: validName,
            location: validLocation,
            brightness: 0,
            status: false
        }))
    );
})

