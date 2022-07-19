interface FormButtonProps {
  isSubmitting: boolean
  text: string
}

export function FormButton({ isSubmitting, text }: FormButtonProps) {
  return (
    <button
      className="h-10 w-20 rounded-md bg-green-500 text-base text-white transition-colors hover:bg-green-300"
      type="submit"
      disabled={isSubmitting}
      title={text}
    >
      {text}
    </button>
  )
}
