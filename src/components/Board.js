import React from 'react';

import Square from './Square';  // 棋盘格子组件


class Board extends React.Component {

    renderSquare(i,className){
        return <Square value = {this.props.Squares[i]} key = {i} clickFn = {() => this.props.clickFn(i)} className = {className}></Square>
    }

    // render 返回DOM结构
    render() {
        let winnerZb = this.props.winnerZb;
        let className = null;
        return  <div>
            {[0,1,2].map((item,index) => {
                return <div className ={'board-row'} key = {item}>
                    {[0,1,2].map((item2,index2) => {
                        if(winnerZb && winnerZb.indexOf(index*3 + index2) > -1){
                            className = 'red'
                        } else {
                            className = null
                        }
                        return this.renderSquare(index*3 + index2,className);
                    })}
                </div>
            })}
        </div>
    }


}

export default Board;