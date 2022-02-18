import Counter from '~/modules/Counter'
import { increment, wrapper } from '~/store'

export default function One() {
  return (
    <div>
      <Counter />
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
