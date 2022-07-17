import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }) {
  return (
    // <MoralisProvider serverUrl='https://xxxxx/server' appId='YOUR_APP_ID'>
      <ApolloProvider client={client}>
        <Component {...pageProps} />{' '}
      </ApolloProvider>
    // </MoralisProvider>
  )
}

export default MyApp
