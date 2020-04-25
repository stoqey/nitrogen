import gql from 'graphql-tag';

import { AlgoResultsFragment } from '../algoresults.typedef';

export const ON_ALGO_RESULTS_SUBSCRIPTION = gql`
  subscription OnAlgoResults($transId: String, $time: String) {
    onAlgoResults(transId: $transId, time: $time) {
       ...AlgoResultsFragment 
    }
  }
  ${AlgoResultsFragment}
`;