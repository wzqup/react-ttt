import React from 'react';

export default function (props) {
    return (
        <button className = {'square ' + props.className} onClick = {props.clickFn}>{props.value}</button>
    )
}