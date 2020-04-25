import gql from 'graphql-tag';

export const RUN_ALGO = gql`
  query RunTheAlgo($input: inputRunAlgo) {
    runAlgo(input: $input)
  }
`;