import Forgot_Password from '../components/auth/Forgot_Password'
import { useGlobalAuthContext } from '../AuthContext'
import Loader from '../components/Loader'

export default function Forgot_password() {
  const { alpha } = useGlobalAuthContext()
  return (
    <>
      {alpha && <Loader />}
      {!alpha && <Forgot_Password />}
    </>
  )
}
