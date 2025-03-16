import React, { useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import Title from './Title';

export default function ScorePage({users, computer, setUsers}) {

    const nav = useNavigate()  
    const {name} = useParams()
    

    useEffect(()=> {
        const storedUsers = sessionStorage.getItem("users")
        if(storedUsers){
            setUsers(JSON.parse(storedUsers))
        }
    }, [])
    
    const bestUser = users.sort((a, b) => b.wins - a.wins)
   
    

  return (
    <>
    <Title />
    <div className='mid-col'>
    
          
          <table border={1}>
            <thead>
              <tr>
              <th>Name</th>
              <th>Wins</th>
              <th>Losses</th>
              </tr>

            </thead>
            <tbody>
      {bestUser.map((user, index) => (  

          <tr key={index}>
              <td>{user.name}</td>
              <td>{user.wins}</td>
              <td>{user.losses}</td>

              </tr>
              ))}
                </tbody>
            </table>
    </div>
    <div>
      <button onClick={() => nav(`/RPS/${name}`)}>Return to Game</button>
      <button onClick={() => nav('/')}>Return to Login Page</button>
    </div>
    </>
  )
}
