/* eslint-disable camelcase */
import { House } from 'phosphor-react'
import { Logout } from './Logout'
import { NewPost } from './NewPost'

interface HeaderProps {
  title_page: string
}
export function Header({ title_page }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-between bg-gray-800 py-5 px-8">
      <title>{title_page}</title>

      <a
        href="/feed"
        className="flex items-center gap-2 text-white transition-colors hover:cursor-pointer hover:text-gray-300"
      >
        <House size={24} />
        <span>Feed</span>
      </a>

      <NewPost />

      <Logout />
    </header>
  )
}
