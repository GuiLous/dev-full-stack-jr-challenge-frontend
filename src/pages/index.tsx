import { FormLogin } from '../components/Session/FormLogin'
import { SessionHeader } from '../components/Session/SessionHeader'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function Home() {
  return (
    <div>
      <SessionHeader title_page="Login | Rede_Social" />

      <main>
        <div className="my-20 mx-auto w-full max-w-[550px] px-8">
          <FormLogin />
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
