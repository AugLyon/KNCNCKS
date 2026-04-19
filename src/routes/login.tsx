import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setHasError(false)
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', username)
        
        navigate({ to: '/vocabulary' })
      } else {
        setHasError(true)
      }
    } catch (error) {
      console.error("Network error:", error)
      alert("Error: Could not connect to the Backend Server.")
    }
  }

  return (
    <div className="w-full h-screen lg:flex font-sans">
      <div className='w-full lg:w-2/5 h-full flex flex-col justify-center items-center bg-white px-8'>
        <h1 className='text-[40px] mb-8 font-bold tracking-wide text-[#111827]'>WELCOME</h1>
        
        <form className='flex flex-col w-full max-w-[340px]' onSubmit={handleLogin}>
          
          {hasError && (
            <div className="bg-[#fad2e1] text-[#d90429] px-4 py-2 rounded-md mb-4 text-xs font-bold text-center border border-[#f8bbd0]">
              Invalid username or password
            </div>
          )}

          <label htmlFor='username' className='mb-1 text-sm font-semibold text-gray-700'>Username</label>
          <input
            id="username"
            type="text"
            required
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full mb-4 p-2.5 text-sm border rounded-lg focus:outline-none transition-all 
              ${hasError ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-[#111827]'}
            `}
          />
          
          <label htmlFor='password' className='mb-1 text-sm font-semibold text-gray-700'>Password</label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full mb-3 p-2.5 text-sm border rounded-lg focus:outline-none transition-all 
              ${hasError ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-[#111827]'}
            `}
          />

          <div className="flex justify-between items-center mb-6 w-full">
            <label className="flex items-center text-xs text-gray-600 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-gray-300 text-black focus:ring-black" />
              Remember me
            </label>
            <a href="#" className="text-xs text-gray-500 hover:text-black hover:underline transition">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className='bg-[#111827] text-white w-fit mx-auto px-12 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-gray-800 transition-all active:scale-95'
          >
            Login
          </button>

          <div className="text-center mt-4 text-xs">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="text-black font-bold hover:underline">
              Sign up
            </Link>
          </div>

          <div className="flex items-center w-full my-5">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-xs text-gray-400 font-medium">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button 
            type="button" 
            className="flex items-center justify-center w-full max-w-[250px] mx-auto border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-50 transition-all"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-xs font-semibold text-gray-600">Login with Google</span>
          </button>

        </form>
      </div>
      
      <div className='w-3/5 h-full hidden lg:block relative bg-[#80b1d3]'>
        <img src="/src/Assets/Images/loginbg.svg" alt="Login background" className='absolute inset-0 w-full h-full object-cover' />
      </div>
    </div>
  )
}