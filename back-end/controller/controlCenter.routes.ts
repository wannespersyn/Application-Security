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
import {LightSource} from "../domain/model/lightSource";
import {Scene} from "../domain/model/scene";
import logger from "../util/logger";


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
 * /controlCenter/addLightSource:
 *   post:
 *      security:
 *         - bearerAuth: []
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
 *      security:
 *         - bearerAuth: []
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
 *
 * /LightSource/changeBrightness:
 *   put:
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
 *   put:
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
 *   put:
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
 *      security:
 *         - bearerAuth: []
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
 * 
 * /deleteLightSource:
 *   del:
 *      summary: delete light source in control center.
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
 *           description: Deleted a light source object
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/LightSource'
 * 
 * /deleteScene:
 *   del:
 *      summary: delete scene in control center.
 *      tags: [Control Center]
 *      parameters:
 *      - in: query
 *        name: name
 *        required: true
 *        schema:
 *           type: string
 *      responses:
 *          200:
 *           description: Deleted a scene object
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Scene'
 * 
 * /deleteUser:
 *   del:
 *      security:
 *        - bearerAuth: []
 *      summary: delete user in control center.
 *      tags: [Control Center]
 *      parameters:
 *      - in: query
 *        name: name
 *        required: true
 *        schema:
 *           type: string
 *      responses:
 *          200:
 *           description: Deleted a user object
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/User'
 * 
 * 
 * /controlCenter/turnLightOff:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Turn the light off
 *     tags: [Control Center]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: A LightSource object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LightSource'
 * 
 * /controlCenter/turnLightOn:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Turn the light on
 *     tags: [Control Center]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: A LightSource object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LightSource'
 * 
 * 
 * /controlCenter/getSpecificLightSource:
 *   get:
 *      security:
 *        - bearerAuth: []
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
 * /getIdLightSource:
 *   get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get id from light source in control center.
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
 *           description: A id of a Light Source object
 *           content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/LightSource'
 */


ControlCenterRouter.post('/', (req: Request, res: Response) => {
    try {
        const result = controlCenterService.createControlCenter();
        logger.info("Control center created successfully.");
        res.status(200).json(result);
    } catch(error) {
        logger.error("Error creating control center: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})


ControlCenterRouter.post('/addLightSource', async (req: Request & { auth }, res: Response) => {
    try {
        const lightSource = <LightSource>req.body;
        const { admin } = req.auth;
        const result = await controlCenterService.addLightSource(lightSource, { admin });
        res.status(200).json(result);
        logger.info("Light source added successfully.");
        return result;
    } catch(error) {
        logger.error("Error adding light source: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.post('/addScene', (req: Request, res: Response) => {
    try {
        const scene = <Scene>req.body;
        const result = controlCenterService.addScene(scene);
        logger.info("Scene added successfully.");
        res.status(200).json(result);
    } catch(error) {
        logger.error("Error adding scene: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.delete('/deleteLightSource', (req: Request, res: Response) => {
    try {
        const name  = <string>req.query.name;
        const location  = <string>req.query.location;
        const result = controlCenterService.deleteLightSource(name, location);
        logger.info("Light source deleted successfully.");
        res.status(200).json(result);
    } catch(error) {
        logger.error("Error deleting light source: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.delete('/deleteScene', (req: Request, res: Response) => {
    try {
        const name  = <string>req.query.name;
        const result = controlCenterService.deleteScene(name);
        logger.info("Scene deleted successfully.");
        res.status(200).json(result);
    } catch(error) {
        logger.error("Error deleting scene: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.delete('/deleteUser', (req: Request & { auth }, res: Response) => {
    try {
        const { admin } = req.auth;
        const name  = <string>req.query.name;
        const result = controlCenterService.deleteUser(name, admin);
        logger.info("User deleted successfully.");
        res.status(200).json(result);
    } catch(error) {
        logger.error("Error deleting user: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.put('/turnLightOn', async (req: Request, res: Response) => {
    try {
        const { name, location } = req.body;
        const result = await controlCenterService.turnLightOn(name, location);
        logger.info("Light turned on successfully.");
        res.status(200).json(result);
    } catch(error) {
        logger.error("Error turning on light: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.put('/turnLightOff', async (req: Request, res: Response) => {
    try {
        const { name, location } = req.body;
        const result = await controlCenterService.turnLightOff(name, location);
        logger.info("Light turned off successfully.");
        res.status(200).json(result);
    } catch(error) {
        logger.error("Error turning off light: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getSpecificLightSource', async (req: Request , res: Response) => {
    try {
        const name  = <string>req.query.name;
        const location  = <string>req.query.location;
        const lightSource = await controlCenterService.getSpecificLighSource(name, location);
        logger.info("Light source retrieved successfully.");
        res.status(200).json(lightSource);
    } catch(error) {
        logger.error("Error retrieving light source: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getIdLightSource', async (req: Request, res: Response) => {
    try {
        const name  = <string>req.query.name;
        const location  = <string>req.query.location;
        const result = await controlCenterService.getIdFromLightSource(name, location);
        logger.info("Light source ID retrieved successfully.");
        res.status(200).json(result);
        return result;
    } catch(error) {
        logger.error("Error retrieving light source ID: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})


ControlCenterRouter.put('/changeBrightness', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const location  = <string>req.body;
        const brightness  = <number>req.body;
        const result = controlCenterService.changeBrightnessLight(name, location, brightness);
        logger.info("Brightness changed successfully.");
        res.status(200).json(result);
    } catch(error) {
        logger.error("Error changing brightness: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.put('/Scene/turnSceneOn', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const result = controlCenterService.turnSceneOn(name);
        logger.info("Scene turned on successfully.");
        res.status(200).json(result);
        return result;
    } catch(error) {
        logger.error("Error turning on scene: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.put('turnSceneOff', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const result = controlCenterService.turnSceneOff(name);
        logger.info("Scene turned off successfully.");
        res.status(200).json(result);
    } catch(error) {
        logger.error("Error turning off scene: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getAllControlCenters', async (req: Request & { auth }, res: Response) => {
    try {
        const controlCenter = await controlCenterService.getAllControlCenters();
        logger.info("All control centers retrieved successfully.");
        res.status(200).json(controlCenter);
    } catch(error) {
        logger.error("Error retrieving all control centers: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getAllUsers', async (req: Request, res: Response) => {
    try {
        const users = await controlCenterService.getAllUsers();
        logger.info("All users retrieved successfully.");
        res.status(200).json(users);
    } catch(error) {
        logger.error("Error retrieving all users: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getAllLightSources', async (req: Request & { auth }, res: Response) => {
    try {
        const { name, admin } = req.auth;   
        const lightSources = await controlCenterService.getAllLightSources({name, admin});
        logger.info("All light sources retrieved successfully.");
        return res.status(200).json(lightSources);
    } catch(error) {
        logger.error("Error retrieving all light sources: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getAllScenes', async (req: Request, res: Response) => {
    try {
        const scenes = await controlCenterService.getAllScenes();
        logger.info("All scenes retrieved successfully.");
        res.status(200).json(scenes);
    } catch(error) {
        logger.error("Error retrieving all scenes: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

ControlCenterRouter.get('/getSpecificScene', async (req: Request, res: Response) => {
    try {
        const name  = <string>req.query.scene
        const scene = await controlCenterService.getSpecificScene(name);
        logger.info("Specific scene retrieved successfully.");
        res.status(200).json(scene);
    } catch(error) {
        logger.error("Error retrieving specific scene: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})


ControlCenterRouter.get('/getSpecificUser', async (req: Request, res: Response) => {
    try {
        const name  = <string>req.query.name;
        const user = await controlCenterService.getSpecificUser(name);
        logger.info("Specific user retrieved successfully.");
        res.status(200).json(user);
    } catch(error) {
        logger.error("Error retrieving specific user: " + error.message);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})


export { ControlCenterRouter }; 