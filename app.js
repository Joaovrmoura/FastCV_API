import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from './src/config/cors.config.js';
import rateLimiter from './src/config/rateLimit.config.js';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
