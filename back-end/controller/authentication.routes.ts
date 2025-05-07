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

import express, { NextFunction, Request, Response } from "express";
import { UserInput } from "../types";
import AuthenticationService from "../service/authentication.service";
import { verifyCaptcha } from "../middleware/recaptchaMiddleware";
import logger from "../util/logger";

const AuthenticationRouter = express.Router();

/**
 * @swagger
 * /authentication/login:
 *   post:
 *      summary: Login using name and password. Returns a token an object with JWT token and user name when succesfull.
 *      tags: [Authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application.json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *             application/json:
 *               schema:  
 *                 $ref: '#/components/schemas/User'
 */

AuthenticationRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await AuthenticationService.authenticate(user);
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });
        logger.info(`User authenticated: ${user.name}`, { user });          
        res.status(200).json({message: "authentication succesfull", token: result});
    } catch(error) {
        logger.error(`Authentication failed: ${error.message}`, {error});
        next(error);
    }
})

/**
 * @swagger
 * 
 *  /authentication/signUp:
 *   post:
 *      summary: sign a new user up to control center.
 *      tags: [Authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *          200:
 *              description: A user object
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/User'
 */

AuthenticationRouter.post('/signUp', verifyCaptcha , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await AuthenticationService.addUserToControlCenter(user);
        logger.info(`User added to control center: ${result.name}`, { user: result });
        res.status(200).json(result);
    } catch(error) {
        logger.error(`User sign-up failed: ${error.message}`, { error });
        next(error);
    }
})

AuthenticationRouter.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});


export default AuthenticationRouter;