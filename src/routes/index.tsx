import { createFileRoute } from '@tanstack/react-router'
import { Link } from 'react-router-dom'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <img className='fixed inset-0 h-screen w-full z-[-1]' src="/src/Assets/Images/background.png" alt="Background" />
            <div className='flex flex-col min-h-dvh lg:h-screen items-center justify-center text-center lg:pt-25'>
                <h1 className='p-2 lg:mb-10 font-gentium text-[50px] lg:text-[80px] -mt-10 font-bold text-black'>Popup Dictionary</h1>
                <p className="font-inter text-[24px] lg:text-[32px] text-black leading-normal mt-4">
                    Translate any word instantly by highlighting it.
                    <br className="hidden lg:block" /> 
                    Save vocabulary and review later — turn everyday reading into
                    <br className="hidden lg:block" /> 
                    an immersive learning experience.
                </p>
                <Link to="/download" className=' mt-10 lg:mt-15 font-jakarta bg-[#4B5563] hover:bg-[#374151] text-[16px] lg:text-[22px] text-white font-bold py-3 px-6 rounded-3xl shadow-lg'>
                    Get Started
                </Link>
            </div>
        </>
    )
}
