const Cell = ({id, cell, go, setGo, cells,setCells, WinningMessage}) => {
    const handleClick = (e) => {
        if(!WinningMessage) {
            const taken = e.target.firstChild?.classList.contains("circle") ||
            e.target.firstChild?.classList.contains("cross") ||
            e.target.classList.contains("circle") ||
            e.target.classList.contains("cross")
            if(!taken) {
                if(go === "circle") {
                    e.target.firstChild.classList.add("circle");
                    handleCellchange("circle")
                    setGo('cross')
                }
                if(go === "cross") {
                    e.target.firstChild.classList.add("cross");
                    handleCellchange("cross")
                    setGo('circle')
                }
            }
        } 
    }

    const handleCellchange = (className) => {
              const nexCell = cells.map((cell, index) => {
                    if(index === id) {
                        return className 
                }
                else{
                    return cell
                }
    })
            setCells(nexCell)
    }
    // console.log(cells);
    
    return (
        <div className="square" id={id} onClick={handleClick}>
            <div className={cell}></div>
        </div>
    )
}

export default Cell;