/* eslint-disable no-octal-escape */
/* eslint-disable camelcase */
import classNames from 'classnames'
import { ThumbsUp } from 'phosphor-react'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { api } from '../../../services/apiClient'
import { queryClient } from '../../../services/queryClient'

interface LikesProps {
  post_id: string
  likes: number
}
export function Likes({ post_id, likes }: LikesProps) {
  const [isLiked, setIsLiked] = useState(false)

  const likePost = useMutation(
    async (post_id: string) => {
      try {
        await api.put('/posts/like-post', {
          post_id,
        })

        setIsLiked(!isLiked)
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

  const removeLikePost = useMutation(
    async (post_id: string) => {
      try {
        await api.put('/posts/remove-like-post', {
          post_id,
        })

        setIsLiked(!isLiked)
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

  async function handleLikePost(post_id: string) {
    await likePost.mutateAsync(post_id)
  }

  async function handleRemoveLikePost(post_id: string) {
    await removeLikePost.mutateAsync(post_id)
  }

  return (
    <div className="mt-4 border-t-[1px] border-solid border-gray-600 pt-3">
      {isLiked ? (
        <button
          className={classNames(
            'flex cursor-pointer items-center rounded-sm border-0 bg-transparent hover:text-red-300',
            {
              'text-green-500': isLiked,
            },
          )}
          onClick={() => handleRemoveLikePost(post_id)}
          title="remover curtida"
        >
          <ThumbsUp className="mr-2" />
          Aplaudir{' '}
          <span className="before:py-0 before:px-1 before:content-['\2022']">
            {likes}
          </span>
        </button>
      ) : (
        <button
          className="flex cursor-pointer items-center rounded-sm border-0 bg-transparent text-gray-400 hover:text-green-300"
          onClick={() => handleLikePost(post_id)}
          title="Curtir post"
        >
          <ThumbsUp className="mr-2" />
          Aplaudir{' '}
          <span className="before:py-0 before:px-1 before:content-['\2022']">
            {likes}
          </span>
        </button>
      )}
    </div>
  )
}
