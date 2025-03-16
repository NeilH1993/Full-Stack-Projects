import React, { useEffect, useRef, useState } from 'react'
import Title from './Title'

export default function Stopper() {

    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState([])

    const intervalRef = useRef()
    const startTimeRef = useRef(0)

    useEffect(() => {

        if(isRunning){
           intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return function clear(){
            clearInterval(intervalRef.current)
        }

    }, [isRunning])

    function start(){
        setIsRunning(true)
        startTimeRef.current = Date.now() - time

    }

    function stop(){
        setIsRunning(false)

    }

    function reset(){
        setTime(0)
        setIsRunning(false)
        setLaps([])

    }

    function lapRecord(){
        setLaps([...laps, time])
    }

    console.log(startTimeRef);
    

    function clock(ms){

        const minutes = Math.floor(ms / (1000 * 60) % 60).toString().padStart(2, "0")
        const seconds = Math.floor(ms / (1000)  % 60).toString().padStart(2, "0")
        const miliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, "0")

    return `${minutes}:${seconds}:${miliseconds}`
    
    }


  return (
    <>
    < Title />
    <div className='flex flex-col items-center'>

    <div className='bg-gray-200 w-52 border mt-10 p-5 border-black rounded-md shadow-md flex flex-col items-center gap-2'>
        <p className='text-5xl text-center'>{clock(time)}</p>
        <div className='flex gap-2'>
            { isRunning ? (
                <button className='border border-black p-3 rounded hover:bg-gray-200 active:bg-gray-300' onClick={lapRecord}>Lap</button>
                
            ):(
                <button className='border border-black p-3 rounded hover:bg-gray-200 active:bg-gray-300' onClick={start}>Start</button>
                
            )
            
        }
            <button className='border border-black p-3 rounded hover:bg-gray-200 active:bg-gray-300' onClick={stop}>Stop</button>
            <button className='border border-black p-3 rounded hover:bg-gray-200 active:bg-gray-300' onClick={reset}>Reset</button>
        </div>
        {laps.map((lap, index) => (
            <p key={index}>Lap {index + 1}: {clock(lap)}</p>
        ))}
    </div>
        </div>
    </>
  )
}
