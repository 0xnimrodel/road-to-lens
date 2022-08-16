import Header from '../components/Header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className='py-24'>{children}</div>
    </>
  )
}
