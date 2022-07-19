/* eslint-disable camelcase */
import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

interface SessionHeaderProps {
  title_page: string
}

export function SessionHeader({ title_page }: SessionHeaderProps) {
  const router = useRouter()

  return (
    <header className="flex items-center justify-center bg-gray-800 py-5 px-0">
      <title>{title_page}</title>

      <nav className="w-full max-w-[12rem]">
        <ul className="flex items-center justify-between text-white transition-colors">
          <li
            className={classNames('hover:text-green-500', {
              'text-green-500': router.pathname === '/',
            })}
          >
            <Link href="/" passHref>
              Login
            </Link>
          </li>
          <div className="h-6 border border-r-zinc-300"></div>
          <li
            className={classNames('hover:text-green-500', {
              'text-green-500': router.pathname === '/create-user',
            })}
          >
            <Link href="/create-user">Create Account</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
