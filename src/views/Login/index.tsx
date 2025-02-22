import LoginForm from './components/LoginForm'

import loginLeft from '@/assets/images/login_left.png'
import logo from '@/assets/images/logo.png'

const { VITE_GLOB_APP_TITLE } = import.meta.env
function Login() {
  return (
    <div className="relative flex items-center justify-center min-w-[550px] h-full min-h-[500px] bg-[url('@/assets/images/login_bg.svg')] bg-center bg-cover">
      {/* <SwitchDark /> */}
      <div className="box-border flex items-center justify-around w-[96%] h-[94%] p-[0_4%_0_20px] overflow-hidden rounded-[10px]">
        <div className="w-[750px]">
          <img src={loginLeft} alt="login" className="w-full h-full" />
        </div>
        <div className="p-[40px_45px_25px] bg-white rounded-[10px] shadow-lg">
          <div className="flex items-center justify-center mb-[40px]">
            <img className="w-[70px]" src={logo} alt="logo" />
            <span className="pl-[25px] text-[48px] font-bold whitespace-nowrap">{VITE_GLOB_APP_TITLE || 'Vite Admin'}</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
