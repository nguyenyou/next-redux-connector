import Nav from '~/components/nav'

export default function MainLayout({ children }) {
  return (
    <div>
      <Nav />
      <main className='p-4'>{children}</main>
    </div>
  )
}
