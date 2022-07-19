import { FormCreateAccount } from '../../components/Session/FormCreateAccount'
import { SessionHeader } from '../../components/Session/SessionHeader'
import { withSSRGuest } from '../../utils/withSSRGuest'

export default function CreateUser() {
  return (
    <div>
      <SessionHeader title_page="Create Account | Rede_Social" />

      <main>
        <div className="my-20 mx-auto w-full max-w-[550px] px-8">
          <FormCreateAccount />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = withSSRGuest(async (_ctx) => {
  return {
    props: {},
  }
})
