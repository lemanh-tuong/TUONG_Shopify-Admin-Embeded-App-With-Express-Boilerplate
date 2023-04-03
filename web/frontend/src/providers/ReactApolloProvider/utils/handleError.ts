import { ApolloError, ServerError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { BEResponseError } from '../@types/BEResponse';

const isNetworkError = (error: ApolloError | undefined): error is ApolloError => {
  return error !== undefined && 'networkError' in error;
};

export const handleError = (error: ApolloError | undefined) => {
  if (isNetworkError(error)) {
    const networkError_ = error.networkError as ServerError;
    if ('result' in networkError_) {
      const result_ = networkError_.result as BEResponseError;
      return new ApolloError({
        errorMessage: result_.message,
        graphQLErrors: result_.response.errors
          .map(error => new GraphQLError(error.message, error))
          .concat(error.graphQLErrors),
        networkError: networkError_,
        clientErrors: error.clientErrors,
        extraInfo: error.extraInfo,
      });
    }
  }
  return error;
};
