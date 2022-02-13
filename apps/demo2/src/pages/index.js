import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '~/store'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Home() {
  const dispatch = useDispatch()
  const value = useSelector((state) => state.counter.value)

  const increseAsync = async () => {
    await sleep(1000)
    dispatch(increment())
  }

  const increse = () => {
    dispatch(increment())
  }

  return (
    <div>
      <div id='count'>{value}</div>
      <div className='flex gap-2'>
        <Button id='btn' onClick={increse}>
          increment
        </Button>
        <Button id='btn2' onClick={increseAsync}>
          increment async
        </Button>
      </div>
    </div>
  )
}
