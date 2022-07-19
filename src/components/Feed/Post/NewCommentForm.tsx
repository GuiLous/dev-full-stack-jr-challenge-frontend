/* eslint-disable camelcase */
import classNames from 'classnames'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useMutation } from 'react-query'
import { api } from '../../../services/apiClient'
import { queryClient } from '../../../services/queryClient'

interface NewCommentFormProps {
  post_id: string
}
export function NewCommentForm({ post_id }: NewCommentFormProps) {
  const [newCommentText, setNewCommentText] = useState('')

  const createNewComment = useMutation(
    async () => {
      try {
        await api.post('/comments', {
          content: newCommentText,
          post_id,
        })
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

  async function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    await createNewComment.mutateAsync()
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <form onSubmit={handleCreateNewComment} className="mt-6 w-full pt-6">
      <strong className="leading-relaxed text-gray-100">
        Deixe seu feedback
      </strong>

      <textarea
        className="mt-4 h-24 w-full resize-none rounded-lg border-0 bg-gray-900 p-4 leading-snug text-gray-100"
        name="comment"
        placeholder="Deixe um comentário"
        value={newCommentText}
        onChange={handleNewCommentChange}
        required
      />

      <div className="flex justify-end">
        <button
          className={classNames(
            'mt-4 cursor-pointer rounded-lg border-0 bg-green-500 py-4 px-6 font-bold text-white transition-colors focus:shadow focus:shadow-white disabled:cursor-not-allowed disabled:opacity-70',
            {
              'hover:bg-green-300': !isNewCommentEmpty,
            },
          )}
          type="submit"
          disabled={isNewCommentEmpty}
          title="Criar novo comentário"
        >
          Comentar
        </button>
      </div>
    </form>
  )
}
