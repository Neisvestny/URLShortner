import 'dotenv/config';
import { env } from './../src/config/env';

export default {
	datasource: {
		url: env.DATABASE_URL,
	},
};
