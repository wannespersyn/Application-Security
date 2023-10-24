import controlCenterDb from "../domain/data-access/controlCenter.db";
import { ControlCenter } from "../domain/model/controlCenter";

const createControlCenter = ({users, light_sources, scenes}: ControlCenter): ControlCenter => {
    const control_center = new ControlCenter({users, light_sources, scenes});
    return controlCenterDb.createControlPanel(control_center);
} 

export default {
    createControlCenter
};