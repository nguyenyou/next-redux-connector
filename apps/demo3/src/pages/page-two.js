export default function Two() {
  return (
    <div>
      <div>Two - getStaticProps</div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: 'two',
    },
  }
}
