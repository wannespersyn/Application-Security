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
import lightSourceService from "../service/lightSource.service";
import {lightSourceRouter} from "./lightSource.routes";


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
 * /LightSource/turnLightOn:
 *   post:
 *      summary: Turn the light on
 *      tags: [Control Center]
 *      requestBody:
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *      responses:
 *          200:
 *              description: A LightSource object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/LightSource'
 *
 * /LightSource/turnLightOff:
 *   post:
 *      summary: Turn the light off
 *      tags: [Control Center]
 *      requestBody:
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *      responses:
 *          200:
 *              description: A LightSource object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/LightSource'
 *
 * /LightSource/changeBrightness:
 *   post:
 *      summary: Change the brightness of the light
 *      tags: [Control Center]
 *      requestBody:
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                brightness:
 *                  type: number
 *      responses:
 *          200:
 *              description: A LightSource object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/LightSource'
 * 
 * /Scene/turnSceneOn:
 *   post:
 *      summary: turn in a scene
 *      tags: [Control Center]
 *      requestBody:
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *      responses:
 *          200:
 *              description: A Scene object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/Scene'
 * 
 * /Scene/turnSceneOff:
 *   post:
 *      summary: turn off a scene
 *      tags: [Control Center]
 *      requestBody:
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *      responses:
 *          200:
 *              description: A Scene object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/Scene'
 * 
 * /getAllControlCenters:
 *   get:
 *      summary: Get all control centers.
 *      tags: [Control Center]
 *      requestBody:
 *        required: false
 *      responses:
 *          200:
 *           description: A list of Control Center objects
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/ControlCenter'
 * /getAllUsers:
 *   get:
 *      summary: Get all users in control center.
 *      tags: [Control Center]
 *      requestBody:
 *        required: false
 *      responses:
 *          200:
 *           description: A list of User objects
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/User'
 * 
 * 
 * /getAllLightSources:
 *   get:
 *      summary: Get all light sources in the control center.
 *      tags: [Control Center]
 *      requestBody:
 *        required: false
 *      responses:
 *          200:
 *           description: A list of Light Source objects
 *           content:
 *                application.json:
 *                    schema:
 *                      $ref: '#/components/schemas/LightSource'
 * 
 *
 * /getAllScenes:
 *   get:
 *      summary: Get all scenes in the control center.
 *      tags: [Control Center]
 *      requestBody:
 *        required: false
 *      responses:
 *          200:
 *           description: A list of scene objects
 *           content:
 *                application.json:
 *                    schema:
 *                      $ref: '#/components/schemas/Scene'
 * /getSpecificUser:
 *   get:
 *      summary: Get specific user in control center.
 *      tags: [Control Center]
 *      parameters:
 *      - in: query
 *        name: name
 *        required: true
 *        schema:
 *           type: string
 *      responses:
 *          200:
 *           description: A User object
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/User'
 * 
 * /getSpecificLightSource:
 *   get:
 *      summary: Get specific light source in control center.
 *      tags: [Control Center]
 *      parameters:
 *      - in: query
 *        name: name
 *        required: true
 *        schema:
 *           type: string
 *      - in: query
 *        location: location
 *        required: true
 *        schema:
 *           type: string
 *      responses:
 *          200:
 *           description: A Light Source object
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/LightSource'
 * 
 * /getSpecificScene:
 *   get:
 *      summary: Get specific scene  in control center.
 *      tags: [Control Center]
 *      parameters:
 *      - in: query
 *        name: name
 *        required: true
 *        schema:
 *           type: string
 *      responses:
 *          200:
 *           description: A Scene object
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Scene'
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

ControlCenterRouter.post('/turnLightOn', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const location  = <string>req.body;
        const result = controlCenterService.turnLightOn(name, location);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.post('/turnLightOff', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const location  = <string>req.body;
        const result = controlCenterService.turnLightOff(name, location);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.post('/changeBrightness', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const location  = <string>req.body;
        const brightness  = <number>req.body;
        const result = controlCenterService.changeBrightnessLight(name, location, brightness);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

/**
 * 
 * SCENE CONTROL FUNCTIONS
 * 
 */

ControlCenterRouter.post('turnSceneOn', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const result = controlCenterService.turnSceneOn(name);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.post('turnSceneOff', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const result = controlCenterService.turnSceneOff(name);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

/**
 * GETTERS
 */

ControlCenterRouter.get('/getAllControlCenters', async (req: Request, res: Response) => {
    try {
        const controlCenter = await controlCenterService.getAllControlCenters();
        res.status(200).json(controlCenter);
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

ControlCenterRouter.get('/getAllLightSources', async (req: Request, res: Response) => {
    try {
        const lightSources = await controlCenterService.getAllLightSources();
        return res.status(200).json(lightSources);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getAllScenes', async (req: Request, res: Response) => {
    try {
        const scenes = await controlCenterService.getAllScenes();
        res.status(200).json(scenes);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

/**
 * 
 * FIND FUNCTIONS
 * 
 */

ControlCenterRouter.get('/getSpecificLighSource', async (req: Request, res: Response) => {
    try {
        const name  = <string>req.query.name;
        const location  = <string>req.query.location;
        const lightSource = await controlCenterService.getSpecificLighSource(name, location);
        res.status(200).json(lightSource);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getSpecificScene', async (req: Request, res: Response) => {
    try {
        const name  = <string>req.query.scene
        const scene = await controlCenterService.getSpecificScene(name);
        res.status(200).json(scene);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getSpecificUser', async (req: Request, res: Response) => {
    try {
        const name  = <string>req.query.name;
        const user = await controlCenterService.getSpecificUser(name);
        res.status(200).json(user);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})


export { ControlCenterRouter }; 