import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../src/apollo-client.js'
import { ThemeProvider } from 'next-themes'
import { getDefaultProvider } from 'ethers'
import { createClient, WagmiConfig } from 'wagmi'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <WagmiConfig client={client}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />{' '}
        </ApolloProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}

export default MyApp
