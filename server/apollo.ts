import { ApolloServer, makeExecutableSchema, PubSub } from 'apollo-server-express';
import express from 'express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { GraphQLPath } from '../shared/config';
import typeDefs from '../shared/graphql/typedef'
import { PORT } from './config';
import { QueryResolver, SubscriptionResolver } from './resolvers';
import { resolverEvents } from './resolvers/resolver.events';


/**
 * Add apollo server and subscription
 * @param server express.Application
 */
export const apolloServerSetUp = (server: express.Application, handle: any) => {
  const pubsub = new PubSub();

  const context = () => {
    return {
      pubsub
    }
  };

  // Resolvers definition
  const resolvers = {
    Query: QueryResolver,
    Subscription: SubscriptionResolver(pubsub),
  };

  // Schema definition
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // 1. Resolver events
  resolverEvents(pubsub);

  // 2. Add Apollo server
  const apolloServer = new ApolloServer({ schema, context });
  const gqlPath = GraphQLPath;
  apolloServer.applyMiddleware({ app: server, path: gqlPath });

  // 3. NextJS handle
  // All client side for nextjs
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  // 3. Add web sockets
  // Wrap the Express server
  const ws = createServer(server);
  ws.listen(PORT, () => {
    console.log(`Apollo Server is now running on http://localhost:${PORT}`);
    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
      server: ws,
      path: gqlPath,
    });
  });


}
