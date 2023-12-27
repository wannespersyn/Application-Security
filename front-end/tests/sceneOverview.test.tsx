import { render } from "react-dom"
import { screen } from "@testing-library/react"
import SceneOverview from "@/component/control/SceneOverview";

const scenes = [
    {
        id: 0,
        name: "Scene 1",
        lightSources: [
            {
                id: 0,
                name: "Light 1",
                location: "living room",
                brightness: 50,
                status: false
            },
            {
                id: 1,
                name: "Light 2",
                location: "living room",
                brightness: 50,
                status: false
            }
        ]
    },
    {
        id: 1,
        name: "Scene 2",
        lightSources: [
            {
                id: 0,
                name: "Light 1",
                location: "kitchen",
                brightness: 100,
                status: false
            },
            {
                id: 1,
                name: "Light 2",
                location: "kitchen",
                brightness: 100,
                status: false
            }
        ]
    }
]

test('given scenes - when you want to see the overview - then you should see the overview', () => {
    //when
    render(<SceneOverview scenes={scenes} />);

    //then
    expect(screen.getByText("Scene 1"));
});