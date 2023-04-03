import { Router } from 'express';
import { getSettingFromMetafield } from './controllers/getSettingFromMetafield';
import { initializationApp } from './controllers/initializationApp';
import { saveSettingToMetafield } from './controllers/saveSettingToMetafield';

export const apiRouter = Router({});

apiRouter.get('/initialization', ...initializationApp);
apiRouter.post('/setting', ...saveSettingToMetafield);
apiRouter.get('/setting', ...getSettingFromMetafield);
