import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { env } from './config/env';
import { errorHandler } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import routes from './routes';
import { AppError } from './utils/AppError';

const app = express();

app.use(
	cors({
		origin: env.CORS_ORIGIN,
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/api', routes);

if (env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../public')));
	app.get('*', (_req, res) => {
		res.sendFile(path.join(__dirname, '../public', 'index.html'));
	});
} else {
	app.use((req, res, next) => {
		next(
			new AppError(StatusCodes.NOT_FOUND, 'NOT_FOUND', 'Route not found'),
		);
	});
}

app.use(errorHandler);

export default app;
