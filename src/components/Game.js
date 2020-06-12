import React from 'react';

import Board from './Board';   // 棋盘组件

import getWinner from '../utils/index'  // 获取胜利者的函数


export default  class Game extends React.Component{
    constructor(){
        super();
        this.state = {
            // 玩家
            player: true,
            // 历史记录
            history:[
                {squares: Array(9).fill(null),coord:Array(2).fill(null),player:'X'}
            ],
            // 当前步数
            stepNum: 0,
            // 历史记录升序还是降序
            ascend: true
        }
    }

    render () {
        // 历史记录数组
        let history = this.state.history.slice();
        
        //  当前渲染的棋子数组
        let currentSquares = this.state.history[this.state.stepNum].squares;

        let status,winner;

        winner = getWinner(currentSquares);

        if(winner.Square){
            status = `winner: ${winner.Square}`
        } else if(history.length === 10) {
            status = '平局!!'
        } else {
            status = `当前玩家: ${this.state.player?'X':'O'}`
        }

        if(!this.state.ascend){
            history.reverse();
        }
        
        
        return <div className='game'>
            
            <Board Squares = {currentSquares} clickFn = {(i)=> this.handerClick(i)} winnerZb = {winner.zb} />

            <div className='game-info border'>
                <h3>{status}</h3>
                <ol>
                    {history.map((item,index) => {
                        
                        let move,btnStr,dom;
                        // 升序且不是第0项
                        let state1 = this.state.ascend && index;
                        // 降序且不是最后一项
                        let state2 = !this.state.ascend && index !== history.length -1;

                        if(state1) move = index ;
                        if(state2) move = history.length - index -1;

                        btnStr = `Go to -- # ${move}--coord:( ${item.coord.join()} )--player ${item.player}`;

                        dom = <li key={index}><button onClick = {() => this.jumpTo(move)}>{btnStr}</button></li>;

                        if(state1 || state2) return dom;

                        return null;

                    })}
                </ol>
            </div>
            <div className='game-info'>
                <button onClick = {() => this.jumpTo('restart')} key={'重新开始'}>重新开始</button>
                <button onClick = {() => {this.sortOrder()}}>{this.state.ascend ? '升序' : '降序'}</button>
            </div>
        </div>
    }
        // 点击事件处理函数
    handerClick (i) {
        // 棋盘坐标数组
        const coordArr = [
             [1,1],[2,1],[3,1],
             [1,2],[2,2],[3,2],
             [1,3],[2,3],[3,3]
        ];

        // 更新历史记录数组
        let history = this.state.history.slice(0,this.state.stepNum+1);

        // 当前棋子信息
        let squareInfo = this.state.history[this.state.stepNum];
        // 拷贝当前棋子信息数组
        let squares = squareInfo.squares.slice();
        // 拷贝当前棋子坐标数组
        let coord = squareInfo.coord.slice();

        let winner = getWinner(squares);
    
        // 有胜利者,或者该格子已经有棋子不执行后面
        if(winner.Square || squares[i]){
            return;
        }
    
        squares[i] = this.state.player ? 'X' : 'O';
        coord = coordArr[i]

        this.setState({
            player: !this.state.player,
            history: history.concat({squares,coord,player: squares[i]}),
            stepNum: history.length
        })
    }

    // 跳转到某步
    jumpTo(step){
        if(step === 'restart'){
            this.setState({
                player: true,
                history:[
                    {squares: Array(9).fill(null),coord:Array(2).fill(null),player:'X'}
                ],
                stepNum: 0
            })
        } else {
            this.setState({
                stepNum: step,
                player: step % 2 === 0
            })
        }

    }

    // 切换升降序
    sortOrder(){
        if(this.state.history.length > 1){
            this.setState({
                ascend:!this.state.ascend
            })
        } else {
            alert('当前没有历史记录,无法排序!')
        }

    }
}
