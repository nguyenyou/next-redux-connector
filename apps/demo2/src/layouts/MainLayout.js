import { Nav } from '@nrc/shared'

export default function MainLayout({ children }) {
  return (
    <div>
      <Nav />
      <main className='p-4'>{children}</main>
    </div>
  )
}
