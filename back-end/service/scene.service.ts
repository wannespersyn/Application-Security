import sceneDb from "../domain/data-access/scene.db";
import { Scene } from "../domain/model/scene";
import { SceneInput } from "../types";

const createScene = ({name, activationTargets}: SceneInput): Scene => {
    const scene = new Scene({name, activationTargets});
    return sceneDb.createScene(scene);
};

export default {
    createScene
};