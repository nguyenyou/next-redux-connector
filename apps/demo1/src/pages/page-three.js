export default function Three() {
  return (
    <div>
      <div>Three - getInitialProps</div>
    </div>
  )
}

Three.getInitialProps = async () => {
  return {
    title: 'three',
  }
}
