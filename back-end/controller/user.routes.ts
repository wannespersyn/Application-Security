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
 *      UserInput:
 *          type: object
 *          properties:
 *            name: 
 *              type: string
 *            password: 
 *              type: string
*/

import express, { Request, Response } from "express";
import userService from "../service/user.service";
import { UserInput } from "../types";

const userRouter = express.Router();

/**
 * @swagger
 * /Users:
 *   post:
 *      summary: Create a new user
 *      requestBody: 
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *          200:
 *              description: A User object
 *              content:
 *                  application.json:
 *                      schema:
 *                        $ref: '#/components/schemas/User'
 */

userRouter.post('/', (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = userService.createUser(user);
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({status: "error", errorMessage: error.message});
    }
})

export { userRouter };