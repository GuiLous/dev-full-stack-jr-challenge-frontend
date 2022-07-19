/* eslint-disable camelcase */
import { useQuery, UseQueryResult } from 'react-query'
import { api } from '../apiClient'

type Comment = {
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

type Post = {
  id: string
  content: string
  likes: number
  user_id: string
  created_at: Date
  updated_at: Date
  Comments: Comment[]
  user: {
    nick_name: string
    bio: string
  }
}

type GetPostsResponse = {
  posts: Post[]
}

export async function getPosts(
  user_nick_name: string,
): Promise<GetPostsResponse> {
  try {
    if (user_nick_name) {
      const { data } = await api.get(`/posts/${user_nick_name}/feed`)

      const posts = data.map((post: Post) => {
        return {
          id: post?.id,
          content: post?.content,
          likes: post?.likes,
          user_id: post?.user_id,
          created_at: post?.created_at,
          updated_at: post?.updated_at,
          Comments: post?.Comments,
          user: {
            nick_name: post?.user.nick_name,
            bio: post?.user.bio,
          },
        }
      })

      return {
        posts,
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

export function usePosts(user_nick_name: string) {
  return useQuery(
    ['posts-feed', user_nick_name],
    () => getPosts(user_nick_name),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  ) as UseQueryResult<GetPostsResponse, unknown>
}
