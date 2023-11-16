/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *            password:
 *              type: string
 *            isAdmin:
 *              type: boolean
 *      UserInput:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *            password:
 *              type: string
 *            isAdmin:
 *              type: boolean
*/

import express, { Request, Response } from "express";
import userService from "../service/user.service";
import { UserInput } from "../types";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User functions
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: A User object is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = userService.createUser(user);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
});

export { userRouter };