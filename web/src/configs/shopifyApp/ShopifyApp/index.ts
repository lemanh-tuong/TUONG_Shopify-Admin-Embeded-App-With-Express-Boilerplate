import { ApiVersion, GraphqlQueryError } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';
import { shopifyApp as shopifyAppExpress, ShopifyApp as ShopifyAppExpress } from '@shopify/shopify-app-express';
import {
  apiVersion,
  authCallbackUrl,
  authUrl,
  host,
  scopes,
  shopifyApiKey,
  shopifyApiSecret,
  webhookUrl,
} from 'configs/env';
import { HttpStatusCode } from 'consts';
import { reportService } from 'services';
import { getSessionAfterVerify } from 'utils';
import { sessionStorage } from './sessionStorage';

interface ShopifyGraphqlResponseError {
  data: null;
  errors: [
    {
      message: 'Access denied for shopLocales field. Required access: `read_locales` access scope.';
      locations: [{ line: 2; column: 3 }];
      path: ['shopLocales'];
      extensions: {
        code: 'ACCESS_DENIED';
        documentation: 'https://shopify.dev/api/usage/access-scopes';
        requiredAccess: '`read_locales` access scope.';
      };
    },
  ];
  extensions: {
    cost: {
      requestedQueryCost: 1;
      actualQueryCost: 1;
      throttleStatus: {
        maximumAvailable: 1000;
        currentlyAvailable: 999;
        restoreRate: 50;
      };
    };
  };
}

type TShopifyApp = ShopifyAppExpress & {
  graphqlController: Express.MutationRequestHandler<
    any | (Express.BaseResponseError & { response: ShopifyGraphqlResponseError | null })
  >;
};

/**
 * @description Create shopify app express
 * @see https://github.com/Shopify/shopify-app-js/blob/main/packages/shopify-app-express/docs/reference/shopifyApp.md
 * DANGER: Những thứ liên quan đến shopify và các service hosting ===> không nên update
 */
export const ShopifyApp: TShopifyApp = {
  ...shopifyAppExpress({
    api: {
      apiVersion: apiVersion as ApiVersion,
      restResources,
      apiKey: shopifyApiKey,
      apiSecretKey: shopifyApiSecret,
      hostName: host,
      scopes: scopes.split(','),
      hostScheme: 'https',
      isEmbeddedApp: true,
      billing: {
        // // The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
        // // See the ensureBilling helper to learn more about billing in this template.
        // 'My Shopify One-Time Charge': {
        //   // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
        //   amount: 5.0,
        //   currencyCode: 'USD',
        //   interval: BillingInterval.OneTime,
        // },
      },
    },
    auth: {
      path: authUrl,
      callbackPath: authCallbackUrl,
    },
    webhooks: {
      path: webhookUrl,
    },
    sessionStorage: sessionStorage,
    useOnlineTokens: false,
    exitIframePath: '/exitiframe',
  }),
  graphqlController: async (req, res) => {
    try {
      const session = getSessionAfterVerify(res);
      const client = new ShopifyApp.api.clients.Graphql({ session });
      const response = await client.query<any>({ data: req.body });
      res.json(response.body);
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        res.status(HttpStatusCode.BAD_REQUEST);
        res.json({
          message: error.message,
          response: error.response,
          exceptionName: 'GraphqlQueryError',
        });
      } else if (error instanceof Error) {
        reportService.createReportError({
          error,
          positionError: __filename,
          additionalData: JSON.stringify({ body: req.body, headers: req.headers }),
        });
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
        res.json({
          message: error,
          response: null,
          exceptionName: 'Error',
        });
      }
    }
  },
};
/** <------------------------------------------------------------------------------------------> */
