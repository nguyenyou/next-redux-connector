import { useEffect, useMemo, useRef } from 'react'
import { Provider } from 'react-redux'

export const HYDRATE = '__NEXT_REDUX_WRAPPER_HYDRATE__'

const getIsServer = () => typeof window === 'undefined'

let sharedClientStore

const initStore = ({ makeStore, context = {} }) => {
  const createStore = () => makeStore(context)

  if (getIsServer()) {
    const req = context?.req || context?.ctx?.req
    if (req) {
      // ATTENTION! THIS IS INTERNAL, DO NOT ACCESS DIRECTLY ANYWHERE ELSE
      // @see https://github.com/kirill-konshin/next-redux-wrapper/pull/196#issuecomment-611673546
      if (!req.__nextReduxWrapperStore) {
        req.__nextReduxWrapperStore = createStore()
      }
      return req.__nextReduxWrapperStore
    }

    return createStore()
  }

  // Memoize store if client
  if (!sharedClientStore) {
    sharedClientStore = createStore()
  }

  return sharedClientStore
}

export const createWrapper = (makeStore, config = {}) => {
  const makeProps = async ({ context, callback, addStoreToContext = false }) => {
    const store = initStore({ makeStore, context })
    if (config.debug) {
      console.log(`[makeProps] 1. getProps created store with state`, store.getState())
    }

    // Legacy stuff - put store in context
    if (addStoreToContext) {
      if (context.ctx) {
        context.ctx.store = store
      } else {
        context.store = store
      }
    }

    const nextCallback = callback && callback(store)
    const initialProps = (nextCallback && (await nextCallback(context))) || {}

    if (config.debug) {
      console.log(`[makeProps] 3. getProps after dispatches has store state`, store.getState())
    }

    const initialState = store.getState()

    return { initialProps, initialState }
  }

  const getServerSideProps = (callback) => async (context) => await getProps(callback)(context)

  const getStaticProps = (callback) => async (context) => await getProps(callback)(context)

  const getProps = (callback) => async (context) => {
    const { initialProps, initialState } = await makeProps({ context, callback })
    return {
      ...initialProps,
      props: {
        ...initialProps.props,
        initialState,
      },
    }
  }

  const getInitialAppProps = (callback) => async (context) => {
    const { initialProps, initialState } = await makeProps({ callback, context, addStoreToContext: true })
    return {
      ...initialProps,
      initialState,
    }
  }

  const getInitialPageProps = (callback) => async (context) => {
    // context is store ??? avoid double-wrapping
    if ('getState' in context) {
      return callback && callback(context)
    }
    return makeProps({ callback, context, addStoreToContext: true })
  }

  const hydrate = (store, state) => {
    if (!state) return
    store.dispatch({ type: HYDRATE, payload: state })
  }

  const useHybridHydrate = (store, state) => {
    const firstRender = useRef(true)

    useEffect(() => {
      firstRender.current = false
    }, [])

    useMemo(() => {
      // synchronous for server or first time render
      if (getIsServer() || firstRender.current) {
        hydrate(store, state)
      }
    }, [store, state])

    useEffect(() => {
      // asynchronous for client subsequent navigation
      if (!getIsServer()) {
        hydrate(store, state)
      }
    }, [store, state])
  }

  const useWrappedStore = ({ initialState, initialProps, ...props }) => {
    // this happens when App has page with getServerSideProps/getStaticProps, initialState will be dumped twice:
    // one incomplete and one complete
    const initialStateFromGSPorGSSP = props?.pageProps?.initialState

    const store = useMemo(() => initStore({ makeStore }), [])

    if (config.debug) {
      console.log(`[useWrappedStore] 2. getProps created store with state`, store.getState())
    }

    useHybridHydrate(store, initialState)
    useHybridHydrate(store, initialStateFromGSPorGSSP)

    let resultProps = props

    // order is important! Next.js overwrites props from pages/_app with getStaticProps from page
    // @see https://github.com/zeit/next.js/issues/11648
    if (initialProps && initialProps.pageProps) {
      resultProps.pageProps = {
        ...initialProps.pageProps,
        ...props.pageProps,
      }
    }

    // just some cleanup to prevent passing it as props, we need to clone props to safely delete initialState
    if (initialStateFromGSPorGSSP) {
      resultProps = { ...props, pageProps: { ...props.pageProps } }
      delete resultProps.pageProps.initialState
    }

    // unwrap getInitialPageProps
    if (resultProps?.pageProps?.initialProps) {
      resultProps.pageProps = { ...resultProps.pageProps, ...resultProps.pageProps.initialProps }
      delete resultProps.pageProps.initialProps
    }

    return { store, props: { ...initialProps, ...resultProps } }
  }

  const withRedux = (Component) => {
    console.warn(
      '/!\\ You are using legacy implementaion. Please update your code: use createWrapper() and wrapper.useWrappedStore().'
    )

    //TODO Check if pages/_app was wrapped so there's no need to wrap a page itself
    const WrappedComponent = (props) => {
      const { store, props: combinedProps } = useWrappedStore(props, WrappedComponent.displayName)

      return (
        <Provider store={store}>
          <Component {...combinedProps} />
        </Provider>
      )
    }

    WrappedComponent.displayName = `withRedux(${Component.displayName || Component.name || 'Component'})`

    if ('getInitialProps' in Component) {
      WrappedComponent.getInitialProps = Component.getInitialProps
    }

    return WrappedComponent
  }

  return {
    getServerSideProps,
    getStaticProps,
    getInitialAppProps,
    getInitialPageProps,
    useWrappedStore,
    withRedux,
  }
}
