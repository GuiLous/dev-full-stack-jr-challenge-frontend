/* eslint-disable camelcase */
/* eslint-disable no-octal-escape */

import { Pencil, X } from 'phosphor-react'
import { FormEvent, useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { AuthContext } from '../../../contexts/AuthContext'
import { api } from '../../../services/apiClient'
import { queryClient } from '../../../services/queryClient'

import { Comment } from '../Comment'
import { HeaderPost } from './HeaderPost'
import { Likes } from './Likes'
import { NewCommentForm } from './NewCommentForm'

type CommentData = {
  id: string
  content: string
  user_id: string
  post_id: string
  created_at: Date
  updated_at: Date
  user: {
    nick_name: string
  }
}

type Author = {
  nick_name: string
  bio: string
}

export interface PostProps {
  post_id: string
  author: Author
  updated_at: Date
  content: string
  likes: number
  comments: CommentData[]
}

export function Post({
  post_id,
  author,
  content,
  updated_at,
  likes,
  comments,
}: PostProps) {
  const [newPostContent, setNewPostContent] = useState(content)
  const [isEditing, setIsEditing] = useState(false)

  const { loggedUser } = useContext(AuthContext)

  const updatePost = useMutation(
    async () => {
      try {
        await api.put('/posts/edit-post', {
          post_id,
          newContent: newPostContent,
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

  async function handleUpdatePost(event: FormEvent) {
    event.preventDefault()

    await updatePost.mutateAsync()
  }

  return (
    <article className="mb-8 rounded-lg bg-gray-800 p-10">
      <HeaderPost
        nick_name={author.nick_name}
        bio={author.bio}
        updated_at={updated_at}
      />

      <main className="mt-6 flex justify-between gap-2 leading-relaxed text-gray-300">
        {isEditing ? (
          <form onSubmit={handleUpdatePost} className="w-full">
            <textarea
              autoFocus
              value={newPostContent}
              onChange={(event) => setNewPostContent(event.target.value)}
              className="mt-4 h-24 w-full resize-none rounded-lg border-0 bg-gray-900 p-4 leading-snug text-gray-100"
            />

            <button
              type="submit"
              className="w-full rounded-md bg-green-500 py-1 text-white transition-colors hover:bg-green-300"
            >
              Salvar
            </button>
          </form>
        ) : (
          <p className="mt-4">{content}</p>
        )}

        {loggedUser?.nick_name === author.nick_name && (
          <button
            className="cursor-pointer rounded-sm border-0 bg-transparent leading-relaxed text-gray-400 transition-colors hover:text-gray-200"
            title="Editar Post"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X size={24} /> : <Pencil size={24} />}
          </button>
        )}
      </main>

      <Likes likes={likes} post_id={post_id} />

      <NewCommentForm post_id={post_id} />

      <footer className="mt-8">
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            comment_id={comment.id}
            user_nick_name={comment.user.nick_name}
            content={comment.content}
            updated_at={new Date(comment.updated_at)}
          />
        ))}
      </footer>
    </article>
  )
}
