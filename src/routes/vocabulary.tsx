import { createFileRoute, redirect } from '@tanstack/react-router'
import Navbar from '../Components/Header/navbar/Navbar'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/vocabulary')({
  beforeLoad: () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const token = localStorage.getItem('token')

    if (!isAuthenticated || !token) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: Vocabulary,
})

function Vocabulary() {
  const [vocabs, setVocabs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVocabs = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:5000/api/user/get-words', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const result = await response.json()
        if (response.ok) setVocabs(result.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVocabs()
  }, [])

  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-10 pt-32 pb-12">
        <h1 className="text-[56px] font-bold text-center mb-16 font-serif text-[#111827]">
          Your vocabulary
        </h1>

        <div className="flex justify-end mb-8">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-5 pr-12 py-2.5 bg-gray-100/50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
            <svg className="w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-400 font-bold text-md text-gray-800 items-center">
            <div className="col-span-1 flex justify-center">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4h18M6 10h12M9 16h6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="col-span-3">Vocabulary</div>
            <div className="col-span-3">Pronunciation</div>
            <div className="col-span-5">Meaning</div>
          </div>
          
          <div className="flex flex-col">
            {isLoading ? (
              <div className="py-20 text-center text-gray-400 animate-pulse text-lg">Fetching data...</div>
            ) : vocabs.length === 0 ? (
              <div className="py-20 text-center text-gray-400 italic">No words saved yet. Let's start learning!</div>
            ) : (
              vocabs.map((item: any, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 py-8 border-b border-gray-100 text-[15px] items-start hover:bg-gray-50/50 transition-all">
                  <div className="col-span-1"></div>
                  <div className="col-span-3 font-semibold text-gray-900">{item.word?.word}</div>
                  <div className="col-span-3 text-gray-500 font-mono">{item.word?.pronunciation}</div>
                  <div className="col-span-5 text-gray-600 leading-relaxed pr-4">{item.word?.meaning}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}