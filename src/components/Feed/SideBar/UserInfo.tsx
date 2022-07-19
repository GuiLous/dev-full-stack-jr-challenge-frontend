import Avatar from 'react-avatar'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'

export function UserInfo() {
  const { loggedUser } = useContext(AuthContext)

  return (
    <main className="mt-[calc(0px - 1.5rem - 6px)] flex flex-col items-center">
      <Avatar
        name={loggedUser?.nick_name}
        size="60"
        round="10%"
        className="mt-[-15px]"
      />

      <strong className="mt-4 leading-relaxed text-gray-100">
        {loggedUser?.nick_name}
      </strong>
      <span className="text-sm leading-relaxed text-gray-400">
        {loggedUser?.bio}
      </span>
    </main>
  )
}
