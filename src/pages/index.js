import { Fragment } from 'react'
import Seo from '@/helpers/Seo'
import Login from '@/pages/auth/login'


const Home = () => {
  return (
    <Fragment>
      <Seo title="Login" />
      <main>
        <Login />
      </main>
    </Fragment>
  )
}
export default Home;
