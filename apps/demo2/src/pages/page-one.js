import { useSelector } from 'react-redux'
import { increment, wrapper } from '~/store'

export default function One() {
  const value = useSelector((state) => state.counter.value)

  return (
    <div>
      <div id='count'>{value}</div>
      <div>One - getServerSideProps</div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(increment())

  return {
    props: {
      title: 'one',
    },
  }
})
