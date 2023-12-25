/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Scene:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *            activationTargets:
 *              type: object
 *              properties:
 *                name: 
 *                  type: string
 *                location:
 *                  type: string
 *                brightness:
 *                   type: number
 *      SceneInput:
 *          type: object
 *          properties:
 *            name: 
 *              type: string
 *            activationTargets:
 *              type: object
 *              properties:
 *                name: 
 *                  type: string
 *                location:
 *                  type: string
 *                brightness:
 *                   type: number
*/

import express, { Request, Response } from "express";
import sceneService from "../service/scene.service";
import { SceneInput } from "../types";

const sceneRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Scene
 *   description: Scene functions
 *
 * /scene:
 *   post:
 *     summary: Create scene
 *     tags: [Scene]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SceneInput'
 *     responses:
 *       200:
 *         description: A Scene object
 *         content:
 *           application.json:
 *             schema:
 *               $ref: '#/components/schemas/Scene'
 *
 */

sceneRouter.post('/', (req: Request, res: Response) => {
    try {
        const scene = <SceneInput>req.body;
        const result = sceneService.createScene(scene);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})


export { sceneRouter };