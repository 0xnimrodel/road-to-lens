import Search from './Search'
import Link from 'next/link'
import Login from './Login'

export default function Header() {
  return (
    <header className='w-full flex fixed h-20 items-center px-12 dark:bg-neutral-900 top-0'>
      <nav className='w-full flex justify-around'>
        <ul className='flex'>
          <li className='mr-12'>
            <Link href='/'>
              <a className='text-gray-600 hover:text-gray-900 dark:text-lime-500'>
                Home
              </a>
            </Link>
          </li>
          <li className='mr-4'>
            <Link href='/'>
              <a className='text-gray-600 hover:text-gray-900 dark:text-lime-500'>
                Profile
              </a>
            </Link>
          </li>
        </ul>
        <Search />
      <Login/>
      </nav>
    </header>
  )
}
