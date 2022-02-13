import { Provider } from 'react-redux'
import { wrapper } from '~/store'
import { ChakraProvider } from '@chakra-ui/react'
import App from 'next/app'

import MainLayout from '~/layouts/MainLayout'
import '~/styles/globals.css'

export default function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <ChakraProvider>
        <MainLayout>
          <Component {...props.pageProps} />
        </MainLayout>
      </ChakraProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  return {
    pageProps: {
      ...(await App.getInitialProps(appContext)).pageProps,
    }
  }
}