import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/register')({
  component: SignupComponent,
})

function SignupComponent() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorType, setErrorType] = useState('')

  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorType('')

    if (password !== confirmPassword) {
      setErrorType('password_mismatch')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, displayName, password }), 
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registration successful! Redirecting to Login...')
        navigate({ to: '/login' })
      } else {
        if (data.message === 'Username or email already in use') {
          setErrorType('email_exists')
        } else {
          alert("Error: " + (data.message || "Registration failed"));
          setErrorType('invalid_email')
        }
      }
    } catch (error) {
      console.error(error)
      alert('Error: Could not connect to the Backend Server')
    }
  }

  return (
    <div className="w-full h-screen lg:flex">
      <div className='w-full lg:w-2/5 h-full flex flex-col justify-center items-center bg-white px-10'>
        <h1 className='text-[50px] -mt-4 mb-10 font-jakarta font-bold'>WELCOME</h1>

        <form className='flex flex-col w-full max-w-sm overflow-y-auto max-h-[80vh] px-2' onSubmit={handleSignup}>

          {errorType === 'invalid_email' && (
            <div className="bg-[#fad2e1] text-[#d90429] px-4 py-2 rounded-md mb-4 text-sm font-bold text-center">
              Invalid registration details
            </div>
          )}
          {errorType === 'email_exists' && (
            <div className="bg-[#fad2e1] text-[#d90429] px-4 py-2 rounded-md mb-4 text-sm font-bold text-center">
              Username or email already in use
            </div>
          )}
          {errorType === 'password_mismatch' && (
            <div className="bg-[#fad2e1] text-[#d90429] px-4 py-2 rounded-md mb-4 text-sm font-bold text-center">
              Passwords do not match
            </div>
          )}

          <label htmlFor='email' className='mb-2 font-medium font-inter'>Email</label>
          <input
            id="email"
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full mb-4 p-2 border rounded-[10px] focus:outline-none transition-all duration-200 
              ${(errorType === 'email_exists') ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-gray-900'}
            `}
          />

          <label htmlFor='username' className='mb-2 font-medium font-inter'>Username</label>
          <input
            id="username"
            type="text"
            required
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-[10px] focus:outline-none focus:border-gray-900"
          />

          <label htmlFor='displayName' className='mb-2 font-medium font-inter'>Display Name</label>
          <input
            id="displayName"
            type="text"
            required
            placeholder="Enter your display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-[10px] focus:outline-none focus:border-gray-900"
          />

          <label htmlFor='password' className='mb-2 font-medium font-inter'>Password</label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full mb-4 p-2 border rounded-[10px] focus:outline-none transition-all duration-200 
              ${errorType === 'password_mismatch' ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-gray-900'}
            `}
          />

          <label htmlFor='confirmPassword' className='mb-2 font-medium font-inter'>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            required
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full mb-6 p-2 border rounded-[10px] focus:outline-none transition-all duration-200 
              ${errorType === 'password_mismatch' ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-gray-900'}
            `}
          />

          <button
            type="submit"
            className='bg-[#111827] mx-auto mt-2 w-fit px-12 py-3 text-white rounded-full font-extrabold font-jakarta hover:bg-gray-700 transition-all duration-200 active:scale-95'
          >
            Sign up
          </button>

          <div className="text-center mt-6 text-sm pb-10">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="text-black font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>

      <div className='w-3/5 h-full hidden lg:block relative'>
        <img src="/src/Assets/Images/loginbg.svg" alt="Signup background" className='absolute inset-0 z-0 w-full h-full object-cover' />
      </div>
    </div>
  )
}