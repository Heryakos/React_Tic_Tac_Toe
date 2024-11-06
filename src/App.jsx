import { useEffect, useState } from 'react'
import Cell from './components/cell'

const App = ()=> {
  // this is where the game logic will be implemented that all empyty cells can be clicked and the winner will be declared.
const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""])
const [go, setGo] = useState("circle")
const [WinningMessage, setWinningMessage] = useState("")

const checkScore = () => {
  const WinningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  let winnerDeclared = false
  WinningCombos.forEach(array => {
    let circleWins = array.every(cell => cells[cell] === "circle")
    if (circleWins){
        setWinningMessage("Congratulations! Circle wins!")
        winnerDeclared = true
        return
    }
  })
  WinningCombos.forEach(array => {
    let crossWins = array.every(cell => cells[cell] === "cross")
    if (crossWins){
        setWinningMessage("Congratulations! Cross wins!")
        winnerDeclared = true
        return
    }
  })
  if (!winnerDeclared && cells.every(cell => cell !== "")) {
    setWinningMessage("It's a draw!")
  }
}

useEffect(() => {
  checkScore()
},
[cells])
// this to reset the game when the game is over.
const resetGame = () => {
  setCells(["", "", "", "", "", "", "", "", ""])
  setGo("circle")
  setWinningMessage("")
}
const message = WinningMessage || `It's now ${go}'s turn.`
return (
  <>
  <div className='app'>
    <div className='gameboard'>
      {cells.map((cell, index) => (
        <Cell
          key={index}
          id={index}
          cell={cell}
          go={go}
          setGo={setGo}
          cells={cells}
          setCells={setCells}
          WinningMessage={WinningMessage}
        />
      ))}
    </div>
    <p>{message}</p>
    
    {/* Reset button, now styled with a higher z-index  */}
    <button className="reset-button" onClick={resetGame}>
      Reset Game
    </button>
    
    {/* overlay div to show the winner message */}
    {WinningMessage && (
      <div className="overlay">
        <div className="overlay-message">
          {WinningMessage}
        </div>
      </div>
    )}
  </div>
  </>
);

}

export default App
