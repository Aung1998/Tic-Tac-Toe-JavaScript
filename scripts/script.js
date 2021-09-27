const Player = (name, sign) => {
    const moves = []
    
    function addMove(pos){
        moves.push(pos)
    }

    function getMoves(){
        return moves;
    }
    return {
        name: name,
        sign: sign,
        addMove: addMove,
        getMoves: getMoves
    }
}

const Game = (() =>{
    let board = ['', '', '', '', '', '', '', '', '']
    


    function fullBoard(){
        return board.every(idx => idx != '')
    }

    function addMove(player, pos, box){
        if(board[pos] == ''){
            board[pos] = player.sign
            player.addMove(pos)
            return true
        }
        return false;
    }

    function checkWin(moves){
        WIN_MOVES = [[0, 1, 2],[3, 4, 5], [6, 7, 8],
                     [0, 3, 6], [1, 4, 7], [2, 5, 8],
                     [0, 4, 8], [2, 4, 6]]
        return WIN_MOVES.some(set => set.every(move => moves.includes(move)))
    }

    function newGame(){
        const board = Array.from(document.querySelectorAll('.box'))
        const player1_socre = document.querySelector('.play1score')
        const player2_score = document.querySelector('.play2score')

        p1_score = 0
        p2_score = 0

        player1 = Player("Player 1", "X")
        player2 = Player("Player 2", "O")
        player_turn = true;
        board.forEach(box => box.addEventListener('click', () => {
            pos = parseInt(box.dataset.index);
            if (player_turn){
                if (addMove(player1, pos, box)){
                    box.textContent = player1.sign
                    if (checkWin(player1.getMoves())){
                        alert(`${player1.name} has Won!`)
                        p1_score+=1;
                        player1_socre.textContent = p1_score;
                    }
                    player_turn = false;
                }
            }
            else{
                if (addMove(player2, pos, box)){
                    if (checkWin(player2.getMoves())){
                        alert(`${player2.name} has Won!`)
                        p2_score+=1;
                        player2_score.textContent = p1_score;
                    }
                    player_turn = true;
                    box.textContent = player2.sign
                }
            }

        }))
    }


    return{
        newGame
    }
})();

Game.newGame()