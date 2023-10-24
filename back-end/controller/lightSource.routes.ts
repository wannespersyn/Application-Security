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
 *      LightSourceInput:
 *          type: object
 *          properties:
 *            name: 
 *              type: string
 *            location:
 *              type: string
 *            brightness:
 *              type: number
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