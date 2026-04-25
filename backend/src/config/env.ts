import { get } from 'env-var';

export const env = {
	HOST: get('HOST').default('localhost').asString(),
	PORT: get('PORT').default('3000').asPortNumber(),
	CORS_ORIGIN: get('CORS_ORIGIN').default('http://localhost:5173').asString().split(','),

	IS_PROD:
		get('NODE_ENV').default('development').asEnum(['development', 'production', 'test']) ===
		'production',
	JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').default('7d').asString(),
	JWT_SECRET: get('JWT_SECRET').required().asString(),

	// DB
	DATABASE_URL: get('DATABASE_URL').required().asString(),

	// LOGS
	LOG_LEVEL: get('LOG_LEVEL').default('info').asString(),
	LOG_PRETTY: get('LOG_PRETTY').default('false').asBool(),
};
