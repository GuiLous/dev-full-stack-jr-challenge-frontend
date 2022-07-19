import { useContext } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { AuthContext } from '../../../contexts/AuthContext'
import { InputForm } from '../InputForm'
import { FormButton } from '../FormButton'

type LoginFormData = {
  email: string
  password: string
}

export function FormLogin() {
  const { signIn } = useContext(AuthContext)

  async function loginUser(user: LoginFormData) {
    const data = {
      email: user.email,
      password: user.password,
    }

    await signIn(data)
  }

  const newLoginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = newLoginForm

  const handleLoginUser: SubmitHandler<LoginFormData> = (values) => {
    loginUser(values)
    reset()
  }

  return (
    <form
      className="rounded-lg bg-gray-600 py-8 px-12 shadow-md shadow-zinc-900"
      onSubmit={handleSubmit(handleLoginUser)}
    >
      <header className="text-star">
        <strong className="text-2xl font-bold text-green-500">Login</strong>
      </header>

      <main className="mt-8 flex flex-col gap-7">
        <FormProvider {...newLoginForm}>
          <InputForm
            input_id="email"
            label_name="E-mail"
            type="email"
            placeholder="Digite seu email..."
          />
          <InputForm
            input_id="password"
            label_name="Password"
            type="password"
            placeholder="Digite sua senha..."
          />
        </FormProvider>
      </main>

      <footer className="mt-9 flex justify-end">
        <FormButton isSubmitting={isSubmitting} text="Acessar" />
      </footer>
    </form>
  )
}
