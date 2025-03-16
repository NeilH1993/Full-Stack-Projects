import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GameBoard({ users, setUsers, computer, setComputer, resultFlag, setResultFlag, score, setScore }) {

  useEffect(() => {
    const storedUsers = sessionStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);
  
  const {name} = useParams()
 

  const [iconFlagPlayer, setIconFlagPlayer] = useState("")
  const [iconFlagComputer, setIconFlagComputer] = useState("")
  
  function playGame(playerChoice) {
    const gameBoard = ["rock", "paper", "scissors"];
    const currentUser = users.find(user => user.name === name)
    const computerFound = computer.find(c => c.name)
    
    const computerChoice = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    

    const winningPairs = [
        ["rock", "scissors"],
        ["paper", "rock"],
        ["scissors", "paper"],
      ];

      setIconFlagPlayer(playerChoice);
      setIconFlagComputer(computerChoice);

      setScore(true)

      let updatedUsers = [...users];

      
    
    if (playerChoice === computerChoice) {

       setResultFlag("draw")

    } else if(winningPairs.some(([player, computer]) => player === playerChoice && computer === computerChoice)){

        currentUser.wins++
        computerFound.losses++
        
        setResultFlag("player")

        
    } else{

        currentUser.losses++
        computerFound.wins++

        setResultFlag("computer")
        
    }

    updatedUsers = users.map(user => 
      user.name === currentUser.name ? { ...currentUser } : user
    );
    setUsers(updatedUsers);
  sessionStorage.setItem("users", JSON.stringify(updatedUsers));
    setTimeout(() => {
      setResultFlag("")
      setIconFlagPlayer("")
      setIconFlagComputer("");
    }, 1500);
  }

  return (
    <>
      <div className="game-container">
        <div className="game-elements" onClick={() => playGame("rock")}>
          <p className="game-icons">👊</p>
        </div>
        <div className="game-elements" onClick={() => playGame("paper")}>
          <p className="game-icons">🖐</p>
        </div>
        <div className="game-elements" onClick={() => playGame("scissors")}>
          <p className="game-icons">✌</p>
        </div>
      </div>
      <div className='spread-row'>
      { iconFlagPlayer &&

        <div>
          { iconFlagPlayer === "rock" ? (<p style={{fontSize: "3rem"}}>👊</p>) : iconFlagPlayer === "paper" ? (<p style={{fontSize: "3rem"}}>🖐</p>) : iconFlagPlayer === "scissors" && (<p style={{fontSize: "3rem"}}>✌</p>)}
        </div>

      }
      { iconFlagComputer &&

        <div>
          { iconFlagComputer === "rock" ? (<p style={{fontSize: "3rem"}}>👊</p>) : iconFlagComputer === "paper" ? (<p style={{fontSize: "3rem"}}>🖐</p>) : iconFlagComputer === "scissors" && (<p style={{fontSize: "3rem"}}>✌</p>)}
        </div>

      }

      </div>
    </>
  );
}
