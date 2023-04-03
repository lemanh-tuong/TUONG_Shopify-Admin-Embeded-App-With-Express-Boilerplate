// NOTE: File này nên được kéo từ BE sang
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

export interface BEResponseError {
  message: string;
  response: ShopifyGraphqlResponseError;
  exceptionName: 'GraphqlQueryError';
}
