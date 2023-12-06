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
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})


export { lightSourceRouter };