import React from 'react'
import { CreatePostForm } from '../../components/Feed/Post/CreatePostForm'
import { SideBar } from '../../components/Feed/SideBar'
import { Header } from '../../components/Header'
import { withSSRAuth } from '../../utils/withSSRAuth'

export default function CreatePost() {
  return (
    <>
      <Header title_page="Create Post | Rede_Social" />

      <div className="my-8 mx-auto grid max-w-[70rem] grid-cols-[256px_1fr] items-start gap-8 py-0 px-4">
        <SideBar />

        <main>
          <CreatePostForm />
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
