import { useState, useRef, useEffect } from 'react'
import { NavbarMenu } from '../../../Data/data'
import Logo from '../../../Assets/Images/Logo.png'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [isMobileMenuOpen, setIsSidebarMobileOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const userEmail = localStorage.getItem('userEmail') || 'Guest'

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userEmail')
        window.location.href = '/login'
        const EXT_ID = 'ciddfioofmkjdonigbnmonlbkomhmomb'
    try {
        chrome.runtime.sendMessage(EXT_ID, { action: 'clear-tokens' })
    } catch (e) {
        console.warn('Could not clear extension tokens:', e)
    }

    window.location.href = '/login'
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setIsSidebarMobileOpen(false)
            }
            if (window.innerWidth < 960) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('resize', handleResize)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            <nav id="header">
                <div className="fixed z-10 w-full px-4 flex items-center justify-between py-1 bg-white border-b border-gray-100">
                    <div className="flex items-center justify-between grow gap-15 lg:gap-5 xl:gap-15 max-w-175">
                        <div className='shrink-0 flex items-center gap-3'>
                            <img src={Logo} alt="Logo" className="h-15 lg:h-18 w-auto" />
                        </div>
                        <div className="hidden lg:flex grow">
                            <ul className="flex-1 flex justify-between items-center ">
                                {NavbarMenu.map((item) => {
                                    return <li key={item.id} className='relative group'>
                                        <a className="inline-flex py-1 px-4 font-jakarta font-medium text-lg text-[#000000]" href={item.link}>{item.title}</a>
                                        <span className="absolute left-4 right-4 bottom-0 h-0.75 bg-[#000000] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className='flex justify-end items-center grow'>
                        <div className='flex justify-end lg:justify-around grow items-center max-w-155'>
                            <a href="/download"><button className="hidden items-center justify-center gap-2 bg-[#D9D9D9] rounded-[60px] px-7 py-1 lg:flex">
                                <span className='font-jakarta text-lg'>
                                    Download
                                </span>
                                <svg className='relative top-px h-4 w-4 sm:h-5 sm:w-5' viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.1667 11.25H17.5V3.75H10.5V11.25H5.83337L14 20L22.1667 11.25ZM5.83337 22.5V25H22.1667V22.5H5.83337Z" fill="black" fillOpacity="0.87" />
                                </svg>
                            </button></a>
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setOpen(prev => !prev)}
                                    className="hidden lg:flex items-center justify-between gap-3 p-0.5 pr-4 border-2 border-black rounded-full hover:bg-gray-50 transition-colors bg-white"
                                >
                                    <div className="flex items-center gap-1">
                                        <div className="relative w-8 h-8 bg-[#5E7FD3] rounded-full shrink-0" />
                                        <span className="text-lg font-jakarta text-black truncate max-w-35">
                                            {userEmail}
                                        </span>
                                        <svg className="h-4 w-4" viewBox="0 0 29 28">
                                            <path d="M8.66 9.15L14.02 14.49L19.39 9.15L21.04 10.79L14.02 17.79L7.01 10.79Z" />
                                        </svg>
                                    </div>
                                </button>
                                {open && (
                                    <div className="hidden lg:block absolute right-0 mt-2 w-54 rounded-[20px] border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
                                        <a
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                                        >
                                            <svg className='flex items-center justify-center w-6 h-6' viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.2266 3.75005C11.0875 3.62661 3.62661 11.0875 3.75005 20.2266C3.87192 28.9915 11.0086 36.1282 19.7735 36.25C28.9141 36.375 36.3735 28.9141 36.2485 19.775C36.1282 11.0086 28.9915 3.87192 20.2266 3.75005ZM30.1032 29.3165C30.0721 29.3501 30.0339 29.3765 29.9914 29.3938C29.949 29.411 29.9032 29.4187 29.8575 29.4164C29.8117 29.414 29.767 29.4016 29.7266 29.38C29.6861 29.3584 29.6509 29.3282 29.6235 29.2915C28.9247 28.3772 28.0689 27.5944 27.0961 26.9797C25.1071 25.7032 22.5868 25 20 25C17.4133 25 14.893 25.7032 12.904 26.9797C11.9312 27.5942 11.0754 28.3767 10.3766 29.2907C10.3492 29.3274 10.314 29.3576 10.2735 29.3792C10.2331 29.4008 10.1884 29.4132 10.1426 29.4156C10.0968 29.418 10.0511 29.4103 10.0086 29.393C9.96618 29.3757 9.92804 29.3493 9.89692 29.3157C7.60448 26.841 6.3059 23.6073 6.25004 20.2344C6.1227 12.6321 12.361 6.2688 19.9665 6.25005C27.5719 6.2313 33.75 12.4071 33.75 20C33.7527 23.4543 32.4501 26.7819 30.1032 29.3165Z" fill="#0F172A" />
                                            </svg>
                                            <span>Your profile</span>
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-gray-100"
                                        >
                                            <svg className='w-6 h-6 flex items-center justify-center' viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M26.25 29.375V21.25H14.9219C14.5904 21.25 14.2724 21.1183 14.038 20.8839C13.8036 20.6495 13.6719 20.3315 13.6719 20C13.6719 19.6685 13.8036 19.3505 14.038 19.1161C14.2724 18.8817 14.5904 18.75 14.9219 18.75H26.25V10.625C26.2488 9.46506 25.7874 8.35298 24.9672 7.53278C24.147 6.71258 23.0349 6.25124 21.875 6.25H6.875C5.71506 6.25124 4.60298 6.71258 3.78278 7.53278C2.96258 8.35298 2.50124 9.46506 2.5 10.625V29.375C2.50124 30.5349 2.96258 31.647 3.78278 32.4672C4.60298 33.2874 5.71506 33.7488 6.875 33.75H21.875C23.0349 33.7488 24.147 33.2874 24.9672 32.4672C25.7874 31.647 26.2488 30.5349 26.25 29.375Z" fill="#FF383C" />
                                                <path d="M33.232 21.2498L29.1164 25.3662C28.8919 25.6026 28.7686 25.9173 28.7727 26.2432C28.7769 26.5692 28.9082 26.8806 29.1387 27.1111C29.3692 27.3416 29.6807 27.4729 30.0066 27.4771C30.3326 27.4813 30.6473 27.3579 30.8836 27.1334L37.1336 20.8834C37.3678 20.649 37.4994 20.3312 37.4994 19.9998C37.4994 19.6685 37.3678 19.3506 37.1336 19.1162L30.8836 12.8662C30.6473 12.6417 30.3326 12.5184 30.0066 12.5226C29.6807 12.5267 29.3692 12.6581 29.1387 12.8886C28.9082 13.1191 28.7769 13.4305 28.7727 13.7565C28.7686 14.0824 28.8919 14.3971 29.1164 14.6334L33.232 18.7498H26.25V21.2498H33.232Z" fill="#FF383C" />
                                            </svg>
                                            <span>Sign out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="relative lg:hidden">
                                <button className='lg:hidden w-fit hover:bg-[#bcccf9] h-12 text-lg aspect-square p-2 rounded-lg relative flex min-w-fit items-center justify-center overflow-hidden transition-all duration-100' onClick={() => setIsSidebarMobileOpen(!isMobileMenuOpen)}>
                                    <svg className='h-8 w-auto' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="black" fillOpacity="0.87" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        isMobileMenuOpen && (
                            <div className="lg:hidden absolute top-full z-50 left-3 right-3 mt-2 rounded-[10px] py-3 px-5 bg-gray-50 border border-gray-200 " onClick={() => setIsSidebarMobileOpen(false)}>
                                <div className="flex justify-between flex-row items-center shrink-0">
                                    <div className='flex lg:hidden items-start justify-between gap-3 mb-1 p-0.5 pr-4 rounded-full hover:bg-gray-50 transition-colors bg-white'>
                                        <div className="flex items-center gap-2">
                                            <svg className='w-10 h-10' viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M25.2832 4.68743C13.8594 4.53314 4.5332 13.8593 4.6875 25.2831C4.83984 36.2392 13.7607 45.1601 24.7168 45.3124C36.1426 45.4687 45.4668 36.1425 45.3105 24.7187C45.1602 13.7607 36.2393 4.83978 25.2832 4.68743ZM37.6289 36.6454C37.59 36.6875 37.5423 36.7205 37.4892 36.7421C37.4362 36.7637 37.379 36.7733 37.3218 36.7703C37.2646 36.7673 37.2087 36.7518 37.1581 36.7248C37.1076 36.6978 37.0636 36.6601 37.0293 36.6142C36.1558 35.4714 35.0861 34.4929 33.8701 33.7245C31.3838 32.1288 28.2334 31.2499 25 31.2499C21.7666 31.2499 18.6162 32.1288 16.1299 33.7245C14.9139 34.4926 13.8442 35.4707 12.9707 36.6132C12.9364 36.6591 12.8924 36.6969 12.8418 36.7239C12.7913 36.7508 12.7354 36.7664 12.6782 36.7694C12.621 36.7723 12.5638 36.7627 12.5107 36.7411C12.4577 36.7195 12.41 36.6865 12.3711 36.6445C9.50554 33.5511 7.88231 29.509 7.8125 25.2929C7.65332 15.79 15.4512 7.83587 24.958 7.81243C34.4648 7.789 42.1875 15.5087 42.1875 24.9999C42.1908 29.3177 40.5625 33.4773 37.6289 36.6454Z" fill="#0F172A" />
                                                <path d="M25.0009 14.0625C23.0752 14.0625 21.334 14.7842 20.0966 16.0957C18.8593 17.4072 18.2412 19.2207 18.3808 21.167C18.664 25 21.6338 28.125 25.0009 28.125C28.3681 28.125 31.332 25 31.6211 21.168C31.7656 19.2402 31.1523 17.4434 29.8945 16.1074C28.6523 14.7891 26.914 14.0625 25.0009 14.0625Z" fill="#0F172A" />
                                            </svg>
                                            <span className="text-sm sm:text-md font-jakarta text-black truncate max-w-75">
                                                {userEmail}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <ul className='w-full'>
                                        <li className='flex flex-col my-2 relative w-full'>
                                            <a className='flex items-center px-2 py-5 w-full ' href='/'>
                                                <svg className='w-6 h-6' viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M30 29.4467V11.3334L16.6667 3.33337L3.33333 11.3334V29.4467H10V24.8634C10 23.0953 10.7024 21.3996 11.9526 20.1493C13.2029 18.8991 14.8986 18.1967 16.6667 18.1967C18.4348 18.1967 20.1305 18.8991 21.3807 20.1493C22.631 21.3996 23.3333 23.0953 23.3333 24.8634V29.4467H30ZM20 32.78V24.8634C20 23.9793 19.6488 23.1315 19.0237 22.5063C18.3986 21.8812 17.5507 21.53 16.6667 21.53C15.7826 21.53 14.9348 21.8812 14.3096 22.5063C13.6845 23.1315 13.3333 23.9793 13.3333 24.8634V32.78H3.33333C2.44928 32.78 1.60143 32.4288 0.976311 31.8037C0.35119 31.1786 1.54316e-10 30.3308 1.54315e-10 29.4467V11.3334C-5.5379e-06 10.7577 0.149051 10.1919 0.432655 9.69103C0.716259 9.19012 1.12474 8.77119 1.61833 8.47503L14.9517 0.475032C15.4697 0.164196 16.0625 0 16.6667 0C17.2708 0 17.8636 0.164196 18.3817 0.475032L31.715 8.47503C32.2086 8.77119 32.6171 9.19012 32.9007 9.69103C33.1843 10.1919 33.3333 10.7577 33.3333 11.3334V29.4467C33.3333 30.3308 32.9821 31.1786 32.357 31.8037C31.7319 32.4288 30.8841 32.78 30 32.78H20Z" fill="#0F172A" />
                                                </svg>
                                                <span className='ml-5 font-jakarta text-md text-medium text-[#000000]'>Home</span>
                                            </a>
                                        </li>
                                        <li className='flex flex-col my-2 relative w-full'>
                                            <a className='flex items-center px-2 py-5 ' href='/vocabulary'>
                                                <svg className='w-6 h-6' viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M26.25 10H3.75C3.0625 10 2.5 9.4375 2.5 8.75C2.5 8.0625 3.0625 7.5 3.75 7.5H26.25C26.9375 7.5 27.5 8.0625 27.5 8.75C27.5 9.4375 26.9375 10 26.25 10Z" fill="#0F172A" />
                                                    <path d="M15 10C14.3125 10 13.75 9.4375 13.75 8.75V5C13.75 4.3125 14.3125 3.75 15 3.75C15.6875 3.75 16.25 4.3125 16.25 5V8.75C16.25 9.4375 15.6875 10 15 10Z" fill="#0F172A" />
                                                    <path d="M36.25 36.25C35.7656 36.25 35.3047 35.9687 35.1016 35.4922L28.75 20.6719L22.3984 35.4922C22.125 36.125 21.3906 36.4219 20.7578 36.1484C20.125 35.875 19.8281 35.1406 20.1016 34.5078L27.6016 17.0078C27.7969 16.5469 28.25 16.25 28.75 16.25C29.25 16.25 29.7031 16.5469 29.8984 17.0078L37.3984 34.5078C37.6719 35.1406 37.375 35.875 36.7422 36.1484C36.5781 36.2188 36.4141 36.25 36.25 36.25Z" fill="#0F172A" />
                                                    <path d="M33.9453 31.25H23.5547C22.8672 31.25 22.3047 30.6875 22.3047 30C22.3047 29.3125 22.8672 28.75 23.5547 28.75H33.9453C34.6328 28.75 35.1953 29.3125 35.1953 30C35.1953 30.6875 34.6328 31.25 33.9453 31.25Z" fill="#0F172A" />
                                                    <path d="M6.25 31.2499C5.82031 31.2499 5.40625 31.0311 5.17187 30.6327C4.82031 30.039 5.01562 29.2733 5.60937 28.9218C5.65625 28.8983 10.25 26.1405 14.5703 20.8515C18.8672 15.5936 20.7422 8.50771 20.7578 8.4374C20.9297 7.77333 21.6094 7.36708 22.2812 7.53896C22.9531 7.71083 23.3516 8.39052 23.1797 9.0624C23.1016 9.3749 21.1562 16.7343 16.5078 22.4296C11.8984 28.0858 7.08593 30.953 6.88281 31.078C6.6875 31.1952 6.46875 31.2499 6.25 31.2499Z" fill="#0F172A" />
                                                    <path d="M20.0005 27.4998C19.7349 27.4998 19.4693 27.4139 19.2349 27.242C19.1177 27.1483 16.3364 24.992 13.3833 21.1561C10.4536 17.3592 8.94581 14.4452 8.88331 14.3202C8.57081 13.703 8.813 12.953 9.42238 12.6405C10.0396 12.328 10.7896 12.5702 11.1021 13.1795C11.1177 13.2108 12.5786 16.0233 15.3521 19.6248C18.0943 23.1873 20.7271 25.2342 20.7505 25.2577C21.2974 25.6795 21.3989 26.4686 20.9771 27.0077C20.7427 27.3358 20.3755 27.4998 20.0005 27.4998Z" fill="#0F172A" />
                                                </svg>
                                                <span className='ml-5 font-jakarta text-md text-medium text-[#000000]'>Vocabulary</span>
                                            </a>
                                        </li>
                                        <li className='flex flex-col my-2 relative w-full'>
                                            <a className='flex items-center px-2 py-5 ' href='/practice'>
                                                <svg className='w-6 h-6' viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.74999 6.25002C8.81583 6.2732 12.3469 6.91005 14.722 8.04478C17.0254 9.14533 18.259 10.7179 18.7883 12.807C18.9288 13.3616 19.4279 13.75 20 13.75C20.5721 13.75 21.0712 13.3616 21.2117 12.807C21.7409 10.7179 22.9746 9.14533 25.278 8.04478C27.6531 6.91005 31.1842 6.27318 36.25 6.25001V28.75C27.2275 28.75 22.7963 30.3673 19.9999 33.1319C17.2132 30.38 12.7761 28.7528 3.77338 28.75C3.76272 28.7224 3.74999 28.6739 3.74999 28.5992V6.25002ZM2.79473 3.93815C3.09918 3.81272 3.42544 3.74878 3.75471 3.75002L3.7556 3.75002C8.96567 3.77338 12.9328 4.41929 15.7997 5.78902C17.6644 6.67991 19.0512 7.87268 20 9.35219C20.9488 7.87268 22.3356 6.67991 24.2003 5.78902C27.0672 4.41929 31.0343 3.77338 36.2444 3.75002L36.2453 3.75002C36.5746 3.74878 36.9008 3.81272 37.2053 3.93815C37.5097 4.06358 37.7863 4.24803 38.0191 4.48086C38.252 4.71369 38.4364 4.9903 38.5619 5.29475C38.6869 5.59826 38.7508 5.92346 38.75 6.25171V28.75C38.75 29.413 38.4866 30.0489 38.0178 30.5178C37.5489 30.9866 36.913 31.25 36.25 31.25C26.3981 31.25 23.0112 33.2368 20.9761 35.7808C20.7388 36.0775 20.3796 36.2501 19.9997 36.25C19.6199 36.2499 19.2607 36.0771 19.0235 35.7804C17.0022 33.2513 13.6013 31.25 3.74999 31.25C2.996 31.25 2.33619 30.9308 1.88379 30.3994C1.44715 29.8866 1.24999 29.2357 1.24999 28.5992V6.25197C1.24912 5.92363 1.31305 5.59834 1.43813 5.29475C1.56357 4.9903 1.74801 4.71369 1.98084 4.48086C2.21368 4.24803 2.49029 4.06358 2.79473 3.93815Z" fill="#0F172A" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 11.25C20.6904 11.25 21.25 11.8096 21.25 12.5V35C21.25 35.6904 20.6904 36.25 20 36.25C19.3096 36.25 18.75 35.6904 18.75 35V12.5C18.75 11.8096 19.3096 11.25 20 11.25Z" fill="#0F172A" />
                                                </svg>
                                                <span className='ml-5 font-jakarta text-md text-medium text-[#000000]'>Practice</span>
                                            </a>
                                        </li>
                                        <div className='lg:hidden h-0.5 w-full bg-black'></div>
                                        <li className='flex flex-col my-2 relative w-full'>
                                            <button onClick={handleLogout} className='flex items-center px-2 py-5 '>
                                                <svg className='w-6 h-6' viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M31.5 35.25V25.5H17.9062C17.5084 25.5 17.1269 25.342 16.8456 25.0607C16.5643 24.7794 16.4062 24.3978 16.4062 24C16.4062 23.6022 16.5643 23.2206 16.8456 22.9393C17.1269 22.658 17.5084 22.5 17.9062 22.5H31.5V12.75C31.4985 11.3581 30.9449 10.0236 29.9607 9.03933C28.9764 8.05509 27.6419 7.50149 26.25 7.5H8.25C6.85807 7.50149 5.52358 8.05509 4.53933 9.03933C3.55509 10.0236 3.00149 11.3581 3 12.75V35.25C3.00149 36.6419 3.55509 37.9764 4.53933 38.9607C5.52358 39.9449 6.85807 40.4985 8.25 40.5H26.25C27.6419 40.4985 28.9764 39.9449 29.9607 38.9607C30.9449 37.9764 31.4985 36.6419 31.5 35.25Z" fill="#FF383C" />
                                                    <path d="M39.8784 25.5002L34.9397 30.4399C34.6703 30.7235 34.5223 31.1011 34.5273 31.4922C34.5323 31.8834 34.6899 32.2571 34.9665 32.5337C35.2431 32.8103 35.6168 32.9679 36.008 32.9729C36.3991 32.9779 36.7767 32.8299 37.0603 32.5605L44.5603 25.0605C44.8414 24.7792 44.9993 24.3978 44.9993 24.0002C44.9993 23.6025 44.8414 23.2212 44.5603 22.9399L37.0603 15.4399C36.7767 15.1704 36.3991 15.0225 36.008 15.0275C35.6168 15.0325 35.2431 15.1901 34.9665 15.4667C34.6899 15.7433 34.5323 16.117 34.5273 16.5081C34.5223 16.8993 34.6703 17.2769 34.9397 17.5605L39.8784 22.5002H31.5V25.5002H39.8784Z" fill="#FF383C" />
                                                </svg>
                                                <span className='ml-5 font-jakarta text-md text-medium text-[#FF383C]'>Sign out</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                </div>
            </nav>
        </>
    )
}
export default Navbar