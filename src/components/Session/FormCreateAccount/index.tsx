import Router from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { api } from '../../../services/apiClient'
import { FormButton } from '../FormButton'
import { InputForm } from '../InputForm'

type CreateUserFormData = {
  email: string
  password: string
  password_confirmation: string
  nick_name: string
  bio: string
}

export function FormCreateAccount() {
  const createUser = async (user: CreateUserFormData) => {
    try {
      await api.post('/users', {
        email: user.email,
        password: user.password,
        nick_name: user.nick_name,
        bio: user.bio,
      })

      Router.push('/')
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const createAccountForm = useForm({
    defaultValues: {
      email: '',
      nick_name: '',
      bio: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = createAccountForm

  const handleCreateUser: SubmitHandler<CreateUserFormData> = (values) => {
    createUser(values)

    reset()
  }

  return (
    <form
      className="rounded-lg bg-gray-600 py-8 px-12 shadow-md"
      onSubmit={handleSubmit(handleCreateUser)}
    >
      <header className="text-start ">
        <strong className="text-2xl font-bold text-green-500">
          Criar um perfil
        </strong>
      </header>

      <main className="mt-8 flex flex-col gap-7">
        <FormProvider {...createAccountForm}>
          <InputForm
            input_id="email"
            label_name="E-mail"
            placeholder="Ex.: email@example.com"
            type="email"
          />

          <InputForm
            input_id="nick_name"
            label_name="Nome de usuário"
            placeholder="Ex.: usuarioTes123"
            type="text"
          />

          <InputForm
            input_id="bio"
            label_name="Biografia"
            placeholder="Fale algo sobre você..."
            type="text"
          />

          <InputForm
            input_id="password"
            label_name="Password"
            placeholder=""
            type="password"
          />
        </FormProvider>
      </main>

      <footer className="mt-9 flex justify-end">
        <FormButton isSubmitting={isSubmitting} text="Criar" />
      </footer>
    </form>
  )
}
