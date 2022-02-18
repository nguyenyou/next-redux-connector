import { Provider } from 'react-redux'
import { increment, wrapper } from '~/store'
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

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
  store.dispatch(increment())

  return {
    pageProps: {
      ...(await App.getInitialProps(appContext)).pageProps,
    },
  }
})
