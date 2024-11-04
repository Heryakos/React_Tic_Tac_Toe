import { useEffect, useState } from 'react'
import Cell from './components/cell'

const App = ()=> {
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
        {cells.map ((cell, index) => <Cell 
        key={index}
        id={index}
        cell={cell}
        go={go}
        setGo={setGo}
        cells={cells}
        setCells={setCells}
        WinningMessage={WinningMessage}
        />)}
      </div>
      <p>{message}</p>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
    </div>
     
    </>
  )
}

export default App
