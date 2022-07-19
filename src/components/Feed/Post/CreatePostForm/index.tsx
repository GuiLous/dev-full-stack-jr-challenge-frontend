/* eslint-disable camelcase */
/* eslint-disable no-octal-escape */

import classNames from 'classnames'
import Router from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useMutation } from 'react-query'
import { api } from '../../../../services/apiClient'
import { queryClient } from '../../../../services/queryClient'

export function CreatePostForm() {
  const [newContentPost, setNewContentPost] = useState('')

  const createNewPost = useMutation(
    async () => {
      try {
        await api.post('/posts', {
          content: newContentPost,
        })

        setNewContentPost('')

        Router.push('/feed')
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

  async function handleCreateNewPost(event: FormEvent) {
    event.preventDefault()

    await createNewPost.mutateAsync()
  }

  function handleNewPostChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewContentPost(event.target.value)
  }

  const isNewPostsEmpty = newContentPost.length === 0

  return (
    <form
      onSubmit={handleCreateNewPost}
      className="mb-8 rounded-lg bg-gray-800 p-10"
    >
      <strong className="text-bold text-2xl text-white">Criar novo post</strong>

      <textarea
        className="mt-4 h-24 w-full resize-none rounded-lg border-0 bg-gray-900 p-4 leading-snug text-gray-100"
        name="comment"
        placeholder="O que você está pensando?"
        value={newContentPost}
        onChange={handleNewPostChange}
        required
      />

      <div className="flex justify-end  gap-3">
        <a
          href="/feed"
          className="mt-4 cursor-pointer rounded-lg border-0 bg-gray-500 py-4 px-6 font-bold text-white transition-colors hover:bg-gray-400 focus:shadow focus:shadow-white"
        >
          Cancelar
        </a>

        <button
          className={classNames(
            'mt-4 cursor-pointer rounded-lg border-0 bg-green-500 py-4 px-6 font-bold text-white transition-colors focus:shadow focus:shadow-white disabled:cursor-not-allowed disabled:opacity-70',
            {
              'hover:bg-green-300': !isNewPostsEmpty,
            },
          )}
          type="submit"
          disabled={isNewPostsEmpty}
          title="Criar novo comentário"
        >
          Criar Post
        </button>
      </div>
    </form>
  )
}
