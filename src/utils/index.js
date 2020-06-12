// 获取胜利者的方法

function getWinner(Squares) {
    let lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    let winner = {Square:null,zb:null};

    for(let i = 0; i < lines.length; i ++){
        let [a,b,c] = lines[i];
        
        if (Squares[a] && Squares[a] === Squares[b] && Squares[a] === Squares[c]){
            winner = {Square:Squares[a],zb:lines[i]};
            break;
        } 
    }

    return winner;
}

export default getWinner;