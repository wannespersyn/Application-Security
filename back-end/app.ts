import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import {lightSourceRouter} from "./controller/lightSource.routes";
import {sceneRouter} from "./controller/scene.routes";
import {ControlCenterRouter} from "./controller/controlCenter.routes";
import {NextFunction, Request, Response} from "express";
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import * as https from 'https';
import http from 'http';
import * as fs from 'fs'; // For loading certificates
import path from 'path';
import AuthenticationRouter from './controller/authentication.routes';

dotenv.config();
const app = express();

// Security headers
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            connectSrc: ['self', 'https://api.ucll.be'],
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            objectSrc: ["'none'"],
            scriptSrc: ["'self'"]
        },
    })
);

// Port configuration
const port = process.env.APP_PORT || 3000;

// CORS configuration
app.use(cors({origin: 'http://localhost:8000'}));
app.use(bodyParser.json());

// JWT configuration
const publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key.pub'), 'utf8');
app.use(
    expressjwt({
        secret: publicKey,
        algorithms: ['RS256'],
        getToken: (req) => req.cookies.token ?? req.headers['authorization']?.split(' ')[1],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/authentication/login', '/authentication/signUp', '/status']
    })
);

app.use('/authentication', AuthenticationRouter)
app.use('/users', userRouter)
app.use('/lightSource', lightSourceRouter)
app.use('/scene', sceneRouter)
app.use('/controlCenter', ControlCenterRouter)

// Status route
app.get('/status', (req, res) => {
    res.json({ message: 'Control Center is running...' });
});

// Swagger setup
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Control Center API',
            version: '1.0.0',
        },
    },
    apis: ["./controller/*.routes.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'unauthorized', message: err.message });
    } else {
        res.status(400).json({ error: 'application error', message: err.message });
    }
});

// Load certificates
// const options = {
//     key: fs.readFileSync('keys/tls/private.key'),
//     cert: fs.readFileSync('keys/tls/public.crt'),  
// };


// Create HTTPS server
// https.createServer(options, app).listen(port, () => {
//     console.log(`Control center is running on port ${port} with HTTPS.`);
// });

// Create HTTP server
http.createServer(app).listen(port, () => {
    console.log(`Control center is running on port ${port} with HTTP.`);
});
