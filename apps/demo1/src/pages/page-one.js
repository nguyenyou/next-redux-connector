import { useSelector } from 'react-redux'
import { increment, wrapper } from '~/store'
import { sleep } from '~/utils'

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
  await sleep(1000)
  await store.dispatch(increment())

  return {
    props: {
      title: 'one',
    },
  }
})
