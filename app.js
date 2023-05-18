const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')
const startCells = [
    "","","","","","","","",""
]

let go = "circle"
infoDisplay.textContent = "Circle goes first"

function createBoard(){
    startCells.forEach( (_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
}

createBoard()

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now " + go + "'s go."
    e.target.removeEventListener('click', addGo)
    checkScore()
}

function checkScore() {

    const allSquares = document.querySelectorAll(".square")

    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    //check if any of the winning combos exist for circle:
    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle')) // when a user clicks, we append with circle or cross using event listener, so firstChild will be one or the other.

        if (circleWins){
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))//can't remove an event listener here, so have to do it this way
            return
        }

    })

//check if any of the winning combos exist for circle:
    winningCombos.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross')) // when a user clicks, we append with circle or cross using event listener, so firstChild will be one or the other.

        if (crossWins){
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))//can't remove an event listener here, so have to do it this way
            return
        }
    })
}