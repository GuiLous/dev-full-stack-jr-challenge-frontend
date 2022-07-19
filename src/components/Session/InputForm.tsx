/* eslint-disable camelcase */
import { useFormContext } from 'react-hook-form'

interface InputFormProps {
  input_id: string
  type: string
  placeholder: string
  label_name: string
}

export function InputForm({
  input_id,
  type,
  placeholder,
  label_name,
}: InputFormProps) {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-normal text-gray-100" htmlFor={input_id}>
        {label_name}:{' '}
      </label>
      <input
        className="text-bold placeholder:text-gray-150 h-10 border-b-2 border-solid border-b-gray-300 bg-transparent py-0 px-2 text-base text-gray-50 focus:border-b-0 focus:shadow-none"
        type={type}
        id={input_id}
        placeholder={placeholder}
        {...register(input_id)}
      />
    </div>
  )
}
