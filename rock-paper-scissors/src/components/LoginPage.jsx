import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from './Title'

export default function LoginPage({users, setUsers, computer, setComputer}) {

    const [name, setName] = useState("")

    useEffect(()=> {
        const storedUsers = sessionStorage.getItem("users")
        if(storedUsers){
            setUsers(JSON.parse(storedUsers))
        }
    }, [])

    const nav = useNavigate()
    
    function send(){
        const existedUser = users.find(user => user.name === name)
        if(!name){
            alert("You need to type at least one character")
        } else if(existedUser){
            nav(`/RPS/${name}`)
        }else{
            const user = {
                name: name,
                wins: 0,
                losses: 0
            }

            const updatedUsers = [...users, user]
            setUsers(updatedUsers)
            
            sessionStorage.setItem("users", JSON.stringify(updatedUsers))

            const newAiGame = {
                name: "Computer",
                wins: 0,
                losses: 0
            }

            const updatedComputer = [newAiGame]

            setComputer(updatedComputer)

            nav(`/RPS/${name}`)
        }
    }

  return (
    <>
    <Title />
    <div className='mid-col'>
        <span>
    <label>Name: </label>
    <input type="text" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />

        </span>
        <span>
    <button onClick={send}>Start Game</button>

        </span>
    </div>
    </>
  )
}
