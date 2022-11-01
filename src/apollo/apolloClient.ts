import "@apollo/client/core/package.json";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from "@apollo/client";
import { getAccessToken } from "../utils/accessToken";
import { GRAPHQL_ENDPOINT } from "../utils/ClientContants";
import { tokenRefreshLink } from "./apolloLinks";

const cache = new InMemoryCache();

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          operation.setContext({
            headers: {
              authorization: `bearer ${getAccessToken()}`,
            },
          });
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));
      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    tokenRefreshLink,
    requestLink,
    new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      credentials: "include",
    }),
  ]),
  cache,
});

export default client;
