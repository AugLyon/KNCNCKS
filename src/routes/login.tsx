import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className="w-full h-screen lg:flex">
      <div className='w-full lg:w-2/5 h-full flex flex-col justify-center items-center'>
        <h1 className='text-[50px] -mt-4 mb-15 font-jakarta font-bold'>WELCOME</h1>
        <form className='flex flex-col' action='api/auth/logIn' method='POST'>
          <label htmlFor='username' className='mb-2 font-medium font-inter'>Username</label>
          <input
            type="text" required
            placeholder="Enter your username"
            className='min-w-75 max-w-100 mb-5 p-2 border border-gray-300 rounded-[10px] focus:outline-none focus:shadow-md/20 transition transition-all-duration-200'
          />
          <label htmlFor='password' className='mb-2 font-medium font-inter'>Password</label>
          <input
            type="password" required
            placeholder="Enter your password"
            className='min-w-75 max-w-100 mb-5 p-2 border border-gray-300 rounded-[10px] focus:outline-none focus:shadow-md/20 transition transition-all-duration-200'
          />
          <button
            type="submit"
            className='bg-black mx-auto mt-5 w-fit px-12 py-2 text-white p-2 rounded-[18px] font-extrabold font-jakarta hover:bg-gray-700 transition transition-all-duration-200'
          >
            Login
          </button>
        </form>
      </div>
      <div className='w-3/5 h-full'>
        <img src="/src/Assets/Images/loginbg.svg" alt="Login background" className='absolute inset-0 z-0 lg:static w-full h-full object-cover' />
      </div>
    </div>
  )
}
