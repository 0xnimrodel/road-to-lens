import { gql } from '@apollo/client/core';
import { client } from '../apollo-client';
import { login } from '../authentication/login';
import { getAddressFromSigner } from '../ethers.service';

const ADD_REACTION = gql`
  mutation($request: ReactionRequest!) { 
   addReaction(request: $request)
 }
`;

const ReactionType = {
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
}

const addReactionRequest = (profileId, publicationId) => {
  return client.mutate({
    mutation: ADD_REACTION,
    variables: {
      request: {
        profileId,
        UPVOTE,
        publicationId,
      },
    },
  });
};

export const addReaction = async (profileId, publicationId) => {
  
  const address = getAddressFromSigner();
  console.log('add reaction: address', address);

  await login(address);

  await addReactionRequest(profileId, publicationId);

  console.log('add reaction: sucess');
};