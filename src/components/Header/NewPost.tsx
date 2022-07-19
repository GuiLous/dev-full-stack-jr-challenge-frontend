import { PlusCircle } from 'phosphor-react'

export function NewPost() {
  return (
    <div className="flex">
      <a
        href="/create-post"
        className="ml-4 flex items-center gap-2 text-white transition-colors hover:cursor-pointer hover:text-gray-300"
      >
        <PlusCircle size={38} alt="Simbolo de mais para adicionar postagens" />
        <span>Novo Post</span>
      </a>
    </div>
  )
}
