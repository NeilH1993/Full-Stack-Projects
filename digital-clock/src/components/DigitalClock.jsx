import React, { useEffect, useState } from 'react'
import Title from './Title'
export default function DigitalClock() {
    
    const [time, setTime] = useState(new Date());
    
    useEffect(()=> {
           const intervalId = setInterval(() => {
                setTime(new Date())
           }, 1000)
        
           return function clear(){
            
            clearInterval(intervalId)
           }
    }, [])

    function clock(){
        const hours = time.getHours().toString().padStart(2, 0)
        const minutes = time.getMinutes().toString().padStart(2, 0)
        const seconds = time.getSeconds().toString().padStart(2, 0)

        return `${hours}:${minutes}:${seconds}`
    }

  return (
    <>
    <div className='flex flex-col items-center'>

    < Title />
        <div className='bg-gray-200 w-52 border mt-10 p-3 border-black rounded-md shadow-md'>
            <p className='text-5xl text-center'>{clock()}</p>
        </div>
    </div>

    </>
  )
}
