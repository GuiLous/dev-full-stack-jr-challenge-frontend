/* eslint-disable camelcase */
import Avatar from 'react-avatar'
import ptBR from 'date-fns/locale/pt-BR'
import { format, formatDistanceToNow } from 'date-fns'
import { Pencil, X } from 'phosphor-react'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { api } from '../../../services/apiClient'
import { useMutation } from 'react-query'
import { queryClient } from '../../../services/queryClient'

interface CommentProps {
  comment_id: string
  content: string
  user_nick_name: string
  updated_at: Date
}

export function Comment({
  comment_id,
  content,
  user_nick_name,
  updated_at,
}: CommentProps) {
  const [newCommentText, setNewCommentText] = useState(content)

  const [isEditing, setIsEditing] = useState(false)

  const { loggedUser } = useContext(AuthContext)

  const publishedDateFormatted = format(
    updated_at,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    },
  )

  const publishedDateRelativeNow = formatDistanceToNow(updated_at, {
    locale: ptBR,
    addSuffix: true,
  })

  const updateComment = useMutation(
    async () => {
      try {
        await api.put('/comments/update-comment', {
          comment_id,
          newContent: newCommentText,
        })

        setIsEditing(false)
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts-feed')
      },
    },
  )

  async function handleUpdateComment(event: FormEvent) {
    event.preventDefault()

    await updateComment.mutateAsync()
  }

  return (
    <div className="mt-6 flex gap-4">
      <Avatar name={user_nick_name} size="60" round="10%" />

      <div className="flex-1">
        <div className="rounded-lg bg-gray-700 p-4">
          <header className="flex items-start justify-between">
            <div className="flex flex-col">
              <strong className="text-sm leading-relaxed">
                {user_nick_name}
              </strong>
              <time
                className="text-xs leading-relaxed text-gray-400"
                title={publishedDateFormatted}
                dateTime={updated_at.toISOString()}
              >
                {publishedDateRelativeNow}
              </time>
            </div>

            {loggedUser?.nick_name === user_nick_name && (
              <button
                className="cursor-pointer rounded-sm border-0 bg-transparent leading-relaxed text-gray-400 transition-colors hover:text-gray-200"
                title="Editar comentário"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <X size={24} /> : <Pencil size={24} />}
              </button>
            )}
          </header>

          {isEditing ? (
            <form action="" onSubmit={handleUpdateComment} className="w-full">
              <input
                autoFocus
                value={newCommentText}
                onChange={(event) => setNewCommentText(event.target.value)}
                className="mt-4 w-full rounded-sm bg-gray-800 px-2 py-1 text-gray-300"
                onBlur={() => setIsEditing(!isEditing)}
              />
            </form>
          ) : (
            <p className="mt-4 text-gray-300">{content}</p>
          )}
        </div>
      </div>
    </div>
  )
}
