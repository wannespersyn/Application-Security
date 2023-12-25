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

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({origin: 'http://localhost:8000'}));
app.use(bodyParser.json());

app.use('/users', userRouter)
app.use('/lightSource', lightSourceRouter)
app.use('/scene', sceneRouter)
app.use('/controlCenter', ControlCenterRouter)


app.get('/status', (req, res) => {
    res.json({ message: 'Control Center is running...' });
});

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port || 3000, () => {
    console.log(`Control center is running on port ${port}.`);
});
