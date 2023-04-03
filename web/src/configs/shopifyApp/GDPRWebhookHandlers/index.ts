import { DeliveryMethod } from '@shopify/shopify-api';
import { WebhookHandlersParam } from '@shopify/shopify-app-express';
import { webhookUrl } from 'configs/env';
import { APP_SUBSCRIPTIONS_UPDATE, APP_UNINSTALLED, BULK_OPERATIONS_FINISH, WebhookTopics } from './@types';

/**
 * @description Register webhook shopify
 * CONVENTION: Yêu cầu 
    1. Định nghĩa rõ type response của shopify tại "./@types/WebhookResponse"
 */

/** START_EDIT: */
export const GDPRWebhookHandlers: Partial<Record<WebhookTopics, WebhookHandlersParam[string]>> = {
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: webhookUrl,
    callback: async (topic, shop, body, webhookId) => {
      const data = JSON.parse(body) as APP_UNINSTALLED;
      console.log(topic, shop, data, webhookId);
    },
  },
  APP_SUBSCRIPTIONS_UPDATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: webhookUrl,
    callback: async (topic, shop, body, webhookId) => {
      const data = JSON.parse(body) as APP_SUBSCRIPTIONS_UPDATE;
      console.log(topic, shop, data, webhookId);
    },
  },
  BULK_OPERATIONS_FINISH: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: webhookUrl,
    callback: async (topic, shop, body, webhookId) => {
      const data = JSON.parse(body) as BULK_OPERATIONS_FINISH;
      console.log(topic, shop, data, webhookId);
    },
  },
};
