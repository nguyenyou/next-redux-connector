import Link from 'next/link'

export default function Nav() {
  return (
    <div className='flex justify-between h-20'>
      <Link href='/'>
        <a className='bg-green-400 flex-1 flex items-center justify-center'>
          Home
        </a>
      </Link>
      <Link href='/page-one'>
        <a className='bg-red-400 flex-1 flex items-center justify-center'>
          One - getServerSideProps
        </a>
      </Link>
      <Link href='/page-two'>
        <a className='bg-blue-400 flex-1 flex items-center justify-center'>
          Two - getStaticProps
        </a>
      </Link>
      <Link href='/page-three'>
        <a className='bg-yellow-400 flex-1 flex items-center justify-center'>
          Three - getInitialProps
        </a>
      </Link>
    </div>
  )
}
