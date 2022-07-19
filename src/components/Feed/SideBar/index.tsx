import { SidebarLinks } from './SidebarLinks'
import { UserInfo } from './UserInfo'

export function SideBar() {
  return (
    <aside className="overflow-hidden rounded-lg bg-gray-800">
      <img
        src="https://images.unsplash.com/photo-1605142859862-978be7eba909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="imagem aleatória de fundo do perfil"
        className="h-[4.5rem] w-full object-cover"
      />

      <UserInfo />

      <footer className="mt-6 flex items-center justify-between border-t-[1px] border-solid border-gray-600 py-6 px-3 ">
        <SidebarLinks href="/find-users" link_name="explorar" />
        <SidebarLinks href="/following-users" link_name="seguindo" />
        <SidebarLinks href="/followed-by-users" link_name="seguidores" />
      </footer>
    </aside>
  )
}
