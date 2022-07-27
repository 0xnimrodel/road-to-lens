import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../src/apollo-client'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />{' '}
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default MyApp
