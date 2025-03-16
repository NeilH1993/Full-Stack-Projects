import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Title from './Title';
import GameBoard from './GameBoard';
export default function GamePage({users, setUsers, computer, setComputer}) {

    const nav =useNavigate()
    const {name} = useParams()

    const [resultFlag, setResultFlag] = useState("")
    const [score, setScore] = useState("")
  
    
    
   
    const currentUser = users.find(user => user.name === name)
    
    
    const computerFound = computer.find(c => c.name)
    
    
    
    
    
  return (
    <>
    <Title />
    <button onClick={()=> nav('/')}>← Back</button>
    <GameBoard users={users} setUsers={setUsers} computer={computer} setComputer={setComputer} resultFlag={resultFlag} setResultFlag={setResultFlag} score={score} setScore={setScore} />
    { resultFlag &&
    <div>
    {resultFlag === "player" ? (<p style={{color: "green"}}>{name} Won!</p>) : resultFlag === "draw" ? (<p>Draw!</p>) : (<p style={{color: "red"}}>{computerFound.name} Won!</p>)}
    </div>

    }
    { score &&

    <div className='spread-row'>
      <p>{currentUser.name}: {currentUser.wins}</p>
      <p>{computerFound.name}: {computerFound.wins}</p>
    </div>

    }
    <div>
    <button onClick={()=> nav(`/RPS/Score/${name}`)}>Scoreboard</button>

    </div>
    </>
  )
}
