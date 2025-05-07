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
import logger from "../util/logger";

const lightSourceRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: LightSource
 *   description: Light source functions
 * /lightSource:
 *   post:
 *     summary: Create a light source
 *     tags: [LightSource]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LightSourceInput'
 *     responses:
 *       200:
 *         description: A light source object is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LightSource'
 *       500:
 *         description: Some server error
 */

lightSourceRouter.post('/', (req: Request, res: Response) => {
    try {
        const lightSource = <LightSourceInput>req.body;
        const result = lightSourceService.createLightSource(lightSource);
        logger.info(`Light source created: ${JSON.stringify(result)}`);
        res.status(200).json(result);
    } catch(error) {
        logger.error(`Error creating light source: ${error.message}`);
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})


export { lightSourceRouter };