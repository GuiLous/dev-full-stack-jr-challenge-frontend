/* eslint-disable camelcase */
/* eslint-disable no-octal-escape */

import { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { api } from '../../services/apiClient'

type User = {
  id: string
  nick_name: string
  bio: string
}

export function FollowedByList() {
  const [usersFollowedBy, setUsersFollowedBy] = useState<User[]>([])

  useEffect(() => {
    api.get(`/users/profile`).then((response) => {
      const usersData = response.data.followedBy?.map((user) => {
        return {
          id: user.id,
          nick_name: user.nick_name,
          bio: user.bio,
        }
      })
      setUsersFollowedBy(usersData)
    })
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-gray-800 p-10">
      <strong className="text-bold text-2xl text-white">Seus seguidores</strong>

      {usersFollowedBy?.map((user) => (
        <div key={user.id} className="mt-4 flex items-center gap-4">
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
