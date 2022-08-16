import { gql } from '@apollo/client/core'
import apolloClient from '../apollo-client'

const GET_PUBLICATION = `
query CommentFeed($request: PublicationsQueryRequest!, $reactionRequest: ReactionFieldResolverRequest) {
  publications(request: $request) {
    items {
      ... on Comment {
        ...CommentFields
        __typename
      }
      __typename
    }
    pageInfo {
      totalCount
      next
      __typename
    }
    __typename
  }
}

fragment CommentFields on Comment {
  id
  profile {
    ...MinimalProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  collectedBy {
    address
    defaultProfile {
      handle
      __typename
    }
    __typename
  }
  collectModule {
    ...MinimalCollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  commentOn {
    ... on Post {
      pubId: id
      profile {
        ...MinimalProfileFields
        __typename
      }
      reaction(request: $reactionRequest)
      collectedBy {
        address
        defaultProfile {
          handle
          __typename
        }
        __typename
      }
      collectModule {
        ...MinimalCollectModuleFields
        __typename
      }
      stats {
        ...StatsFields
        __typename
      }
      metadata {
        ...MetadataFields
        __typename
      }
      hidden
      createdAt
      __typename
    }
    ... on Comment {
      id
      profile {
        ...MinimalProfileFields
        __typename
      }
      reaction(request: $reactionRequest)
      collectedBy {
        address
        defaultProfile {
          handle
          __typename
        }
        __typename
      }
      collectModule {
        ...MinimalCollectModuleFields
        __typename
      }
      metadata {
        ...MetadataFields
        __typename
      }
      stats {
        ...StatsFields
        __typename
      }
      mainPost {
        ... on Post {
          id
          profile {
            ...MinimalProfileFields
            __typename
          }
          reaction(request: $reactionRequest)
          collectedBy {
            address
            defaultProfile {
              handle
              __typename
            }
            __typename
          }
          collectModule {
            ...MinimalCollectModuleFields
            __typename
          }
          stats {
            ...StatsFields
            __typename
          }
          metadata {
            ...MetadataFields
            __typename
          }
          hidden
          createdAt
          __typename
        }
        ... on Mirror {
          id
          profile {
            ...MinimalProfileFields
            __typename
          }
          reaction(request: $reactionRequest)
          collectModule {
            ...MinimalCollectModuleFields
            __typename
          }
          stats {
            ...StatsFields
            __typename
          }
          metadata {
            ...MetadataFields
            __typename
          }
          mirrorOf {
            ... on Post {
              id
              reaction(request: $reactionRequest)
              profile {
                ...MinimalProfileFields
                __typename
              }
              stats {
                ...StatsFields
                __typename
              }
              hidden
              __typename
            }
            ... on Comment {
              id
              reaction(request: $reactionRequest)
              profile {
                ...MinimalProfileFields
                __typename
              }
              reaction(request: $reactionRequest)
              stats {
                ...StatsFields
                __typename
              }
              hidden
              __typename
            }
            __typename
          }
          createdAt
          __typename
        }
        __typename
      }
      hidden
      createdAt
      __typename
    }
    ... on Mirror {
      id
      reaction(request: $reactionRequest)
      profile {
        ...MinimalProfileFields
        __typename
      }
      metadata {
        ...MetadataFields
        __typename
      }
      mirrorOf {
        ... on Post {
          id
          profile {
            ...MinimalProfileFields
            __typename
          }
          reaction(request: $reactionRequest)
          stats {
            ...StatsFields
            __typename
          }
          hidden
          __typename
        }
        ... on Comment {
          id
          profile {
            ...MinimalProfileFields
            __typename
          }
          reaction(request: $reactionRequest)
          stats {
            ...StatsFields
            __typename
          }
          hidden
          __typename
        }
        __typename
      }
      stats {
        ...StatsFields
        __typename
      }
      hidden
      createdAt
      __typename
    }
    __typename
  }
  hidden
  createdAt
  appId
  __typename
}

fragment MinimalProfileFields on Profile {
  id
  name
  handle
  bio
  ownedBy
  attributes {
    key
    value
    __typename
  }
  picture {
    ... on MediaSet {
      original {
        url
        __typename
      }
      __typename
    }
    ... on NftImage {
      uri
      __typename
    }
    __typename
  }
  followModule {
    __typename
  }
  __typename
}

fragment MinimalCollectModuleFields on CollectModule {
  ... on FreeCollectModuleSettings {
    type
    __typename
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        address
        __typename
      }
      __typename
    }
    __typename
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    amount {
      asset {
        address
        __typename
      }
      __typename
    }
    __typename
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        address
        __typename
      }
      __typename
    }
    __typename
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        address
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment MetadataFields on MetadataOutput {
  name
  description
  content
  cover {
    original {
      url
      __typename
    }
    __typename
  }
  media {
    original {
      url
      mimeType
      __typename
    }
    __typename
  }
  attributes {
    value
    __typename
  }
  __typename
}

fragment StatsFields on PublicationStats {
  totalUpvotes
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  __typename
}
`

const getPublicationRequest = (id) => {
  return apolloClient.query({
    query: gql(GET_PUBLICATION),
    variables: {
      request: {
        commentsOf: id,
        limit: 10,
      },
      reactionRequest: null,
    },
  })
}

export const getPublication = async (publicationId) => {
  const result = await getPublicationRequest(publicationId)
  console.log('publication: result', result.data)

  return result.data
}
