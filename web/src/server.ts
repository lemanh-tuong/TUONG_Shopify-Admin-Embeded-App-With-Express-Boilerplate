import compression from 'compression';
import { baseUrlForApis, GDPRWebhookHandlers, graphqlUrl, ShopifyApp, staticPath } from 'configs';
import cookieParser from 'cookie-parser';
import express from 'express';
import { apiRouter } from 'routes';
import serveStatic from 'serve-static';
import { readFileSync } from 'fs';
import { join } from 'path';

export const app = express();

/**
 * @description <---------- Shopify ---------->
 * DANGER: Những thứ liên quan đến shopify và các service hosting ===> không nên update
 */
app.get(ShopifyApp.config.auth.path, ShopifyApp.auth.begin()); // Set up Shopify authentication
app.get(ShopifyApp.config.auth.callbackPath, ShopifyApp.auth.callback(), ShopifyApp.redirectToShopifyOrAppRoot()); // Set up Shopify authentication
app.post(ShopifyApp.config.webhooks.path, ShopifyApp.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })); // Set up webhook handling
app.post(graphqlUrl, ShopifyApp.validateAuthenticatedSession(), express.json(), ShopifyApp.graphqlController); // Graphql client
/** <------------------------------------------------------------------------------------------> */

/**
 * @description <---------- APIs - General Middlewares ---------->
 * WARNING: Lý do tại sao không apply middleware cho tất cả: 
    - Các hàm xử lý liên quan đến Shopify đang sử dụng được cung cấp bởi "shopify-api-js" và các hàm này sử dụng "rawRequest" và "rawResponse" để xử lý  
    ==> Có thể gặp lỗi nếu apply middlewares 
    - Ví dụ như middleware "express.json" gây lỗi "Processing webhook request | {apiVersion: , domain: , topic: , webhookId: }, Failed to process webhook: Error: No body was received when processing webhook" 
 * START_EDIT:
 */
app.use(`${baseUrlForApis}/*`, ShopifyApp.validateAuthenticatedSession()); // All endpoints after this point will require an active session
app.use(`${baseUrlForApis}/*`, express.json(), compression());
/** <------------------------------------------------------------------------------------------> */

/**
 * @description <---------- APIs - Routes ---------->
 * START_EDIT:
 */
app.use(baseUrlForApis, apiRouter);
/** <------------------------------------------------------------------------------------------> */

/**
 * @description <----------  Client ---------->
 * DANGER: Những thứ liên quan đến shopify và các service hosting ===> không nên update
 */
app.use(serveStatic(staticPath, { index: false }));
app.use('/*', cookieParser(), ShopifyApp.ensureInstalledOnShop(), async (_, res) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(readFileSync(join(staticPath, 'index.html')));
});
/** <------------------------------------------------------------------------------------------> */
