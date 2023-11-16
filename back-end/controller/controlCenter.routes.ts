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
 * tags:
 *   name: Control Center
 *   description: Control center functions
 * /controlCenter:
 *   post:
 *     summary: Create a new control center
 *     tags: [Control Center]
 *     requestBody: 
 *       required: false
 *     responses:
 *       200:
 *         description: A ControlCenter object
 *         content:
 *           application.json:
 *             schema:
 *               $ref: '#/components/schemas/ControlCenter'
 *
 * /controlCenter/addUser:
 *   post:
 *      summary: Add a new user to control center.
 *      tags: [Control Center]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *          200:
 *              description: A ControlCenter object
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/User'
 *
 * /controlCenter/addLightSource:
 *   post:
 *      summary: Add a new light source to control center.
 *      tags: [Control Center]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LightSourceInput'
 *      responses:
 *          200:
 *              description: A ControlCenter object
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/ControlCenter'
 *
 * /controlCenter/addScene:
 *   post:
 *      summary: Add a new scene to control center.
 *      tags: [Control Center]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SceneInput'
 *      responses:
 *          200:
 *              description: A ControlCenter object
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/ControlCenter'
 *
 * /getAllUsers:
 *   get:
 *      summary: Get all users in control center.
 *      tags: [Control Center]
 *      requestBody:
 *        required: false
 *      responses:
 *          200:
 *           description: A User object
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/User'
 */

ControlCenterRouter.post('/', (req: Request, res: Response) => {
    try {
        const result = controlCenterService.createControlCenter();
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

ControlCenterRouter.get('/getAllUsers', async (req: Request, res: Response) => {
    try {
        const users = await controlCenterService.getAllUsers();
        res.status(200).json(users);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})


export { ControlCenterRouter }; 