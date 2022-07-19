/* eslint-disable camelcase */
/* eslint-disable no-octal-escape */

import { UserPlus } from 'phosphor-react'
import { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { api } from '../../services/apiClient'

type User = {
  id: string
  nick_name: string
  bio: string
}

export function FindUsersList() {
  const [users, setUsers] = useState<User[]>([])

  async function handleFollowUser(user_id: string) {
    try {
      await api.put('/users/follow', {
        user_to_follow_id: user_id,
      })

      const usersUpdated = users.filter((user) => user.id !== user_id)

      setUsers(usersUpdated)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    api.get('/users/list-users-to-follow').then((response) => {
      const usersData = response.data?.map((user) => {
        return {
          id: user.id,
          nick_name: user.nick_name,
          bio: user.bio,
        }
      })
      setUsers(usersData)
    })
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-gray-800 p-10">
      <strong className="text-bold text-2xl text-white">
        Encontrar pessoas
      </strong>

      {users?.map((user) => (
        <div key={user.id} className="mt-4 flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1 transition-colors hover:text-green-500"
            title="Seguir usuário"
            onClick={() => handleFollowUser(user.id)}
          >
            <UserPlus size={26} />
          </button>

          <Avatar name={user.nick_name} size="60" round="10%" />

          <div className="flex flex-col">
            <strong className="leading-relaxed text-gray-100">
              {user.nick_name}
            </strong>
            <span className="text-sm leading-relaxed text-gray-400">
              {user.bio}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
