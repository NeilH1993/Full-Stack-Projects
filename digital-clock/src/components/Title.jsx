import React from 'react'
import { useNavigate } from 'react-router-dom'

// Title and Navigation component

export default function Title() {
    const nav = useNavigate()
  return (
    <>
    <h1 className='text-5xl text-center font-bold mt-5'>Clock</h1>
    <div className='flex justify-center gap-5 mt-10'>
        <button className='border border-black p-3 rounded hover:bg-gray-200 active:bg-gray-300' onClick={() => nav('/')}>Clock</button>
        <button className='border border-black p-3 rounded hover:bg-gray-200 active:bg-gray-300' onClick={() => nav('/stopper')}>Stopper</button>
    </div>
    </>
  )
}
