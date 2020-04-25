import gql from 'graphql-tag';

import algoresultsTypedef from './algoresults.typedef';

/**
 * Root TypeDef
 */
const typeDefs = gql`
  type Query {
    runAlgo(input: inputRunAlgo): Boolean
  }
  
  type Subscription {
      onAlgoResults(transId: String, time: String): AlgoResults
  }
`;

/**
 * Combined type defs
 */
export default [algoresultsTypedef, typeDefs]