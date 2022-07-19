/* eslint-disable camelcase */
import { Post } from '../../components/Feed/Post'
import { useContext } from 'react'
import { SideBar } from '../../components/Feed/SideBar'
import { Header } from '../../components/Header'
import { AuthContext } from '../../contexts/AuthContext'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { usePosts } from '../../services/hooks/usePosts'

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

export type PostData = {
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

export default function Feed() {
  const { loggedUser } = useContext(AuthContext)

  const user_nick_name = loggedUser?.nick_name

  const { data } = usePosts(user_nick_name)

  return (
    <>
      <Header title_page="Feed | Rede_Social" />

      <div className="my-8 mx-auto grid max-w-[70rem] grid-cols-[256px_1fr] items-start gap-8 py-0 px-4">
        <SideBar />

        <main>
          {data?.posts.map((post) => (
            <Post
              key={post.id}
              post_id={post.id}
              author={post.user}
              content={post.content}
              updated_at={new Date(post.updated_at)}
              likes={post.likes}
              comments={post.Comments}
            />
          ))}
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  }
})
