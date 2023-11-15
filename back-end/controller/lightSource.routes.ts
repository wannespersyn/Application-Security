/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      LightSource:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *            location:
 *              type: string
 *            brightness:
 *              type: number
 *            status:
 *              type: boolean
 *      LightSourceInput:
 *          type: object
 *          properties:
 *            name: 
 *              type: string
 *            location:
 *              type: string
 *            brightness:
 *              type: number
 *            status:
 *              type: boolean
*/

import express, { Request, Response } from "express";
import lightSourceService from "../service/lightSource.service";
import { LightSourceInput} from "../types";

const lightSourceRouter = express.Router();

/**
 * @swagger
 * /LightSource:
 *   post:
 *      summary: Create a new light source
 *      requestBody: 
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              $ref: '#/components/schemas/LightSourceInput'
 *      responses:
 *          200:
 *              description: A LightSource object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/LightSource'
 *
 */


/**
 * @swagger
 * /LightSource/turnLightOn:
 *   post:
 *      summary: Turn the light on
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
 */

/**
 * @swagger
 * /LightSource/turnLightOff:
 *   post:
 *      summary: Turn the light off
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
 */

/**
 * @swagger
 * /LightSource/changeBrightness:
 *   post:
 *      summary: Change the brightness of the light
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
 */

lightSourceRouter.post('/', (req: Request, res: Response) => {
    try {
        const lightSource = <LightSourceInput>req.body;
        const result = lightSourceService.createLightSource(lightSource);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

lightSourceRouter.post('/turnLightOn', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const result = lightSourceService.turnLightOn(name);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

lightSourceRouter.post('/turnLightOff', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const result = lightSourceService.turnLightOff(name);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

lightSourceRouter.post('/changeBrightness', (req: Request, res: Response) => {
    try {
        const name  = <string>req.body;
        const brightness  = <number>req.body;
        const result = lightSourceService.changeBrightnessLight(name, brightness);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

export { lightSourceRouter };