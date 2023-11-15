/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      ControlCenter:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            users:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  format: int64
 *            lightSources:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  format: int64
 *            scenes:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  format: int64
 *      ControlCenterInput:
 *          type: object
 *          properties:
 *            users:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  format: int64
 *            lightSources:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  format: int64
 *            scenes:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  format: int64
*/

import express, { Request, Response } from "express";
import controlCenterService from "../service/controlCenter.service";
import { ControlCenterInput } from "../types";
import {User} from "../domain/model/user";
import {LightSource} from "../domain/model/lightSource";
import {Scene} from "../domain/model/scene";

const ControlCenterRouter = express.Router();

/**
 * @swagger
 * /ControlCenter:
 *   post:
 *      summary: Create a new control center
 *      requestBody: 
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              $ref: '#/components/schemas/ControlCenterInput'
 *      responses:
 *          200:
 *              description: A ControlCenter object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/ControlCenter'
 */

/**
 * @swagger
 * /ControlCenter/addUser:
 *   post:
 *      summary: Add a new user to control center.
 *      requestBody:
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *          200:
 *              description: A ControlCenter object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/ControlCenter'
 */

/**
 * @swagger
 * /ControlCenter/addLightSource:
 *   post:
 *      summary: Add a new light source to control center.
 *      requestBody:
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              $ref: '#/components/schemas/LightSourceInput'
 *      responses:
 *          200:
 *              description: A ControlCenter object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/ControlCenter'
 */

/**
 * @swagger
 * /ControlCenter/addScene:
 *   post:
 *      summary: Add a new scene to control center.
 *      requestBody:
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              $ref: '#/components/schemas/SceneInput'
 *      responses:
 *          200:
 *              description: A ControlCenter object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/ControlCenter'
 */

ControlCenterRouter.post('/', (req: Request, res: Response) => {
    try {
        const control_center = <ControlCenterInput>req.body;
        const result = controlCenterService.createControlCenter(control_center);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.post('/addUser', (req: Request, res: Response) => {
    try {
        const user = <User>req.body;
        const result = controlCenterService.addUserToControlCenter(user);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})
ControlCenterRouter.post('/addLightSource', (req: Request, res: Response) => {
    try {
        const lightSource = <LightSource>req.body;
        const result = controlCenterService.addLightSource(lightSource);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.post('/addScene', (req: Request, res: Response) => {
    try {
        const scene = <Scene>req.body;
        const result = controlCenterService.addScene(scene);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})
export { ControlCenterRouter };