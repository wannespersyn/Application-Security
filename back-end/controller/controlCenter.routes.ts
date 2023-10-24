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

ControlCenterRouter.post('/', (req: Request, res: Response) => {
    try {
        const control_center = <ControlCenterInput>req.body;
        const result = controlCenterService.createControlCenter(control_center);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

export { ControlCenterRouter };