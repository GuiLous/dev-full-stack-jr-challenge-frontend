import { SignOut } from 'phosphor-react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function Logout() {
  const { signOut } = useContext(AuthContext)

  return (
    <div className="flex ">
      <button
        className="flex gap-2 transition-colors hover:text-red-500"
        title="fazer logout"
        onClick={signOut}
      >
        <SignOut size={24} alt="Simbolo de porta aberta para fazer logout" />{' '}
        Sair
      </button>
    </div>
  )
}
