import React from 'react'

export default function Podium(props) {
    const socket = props.socket
    const target = props.target
    const winner = props.winner

    return (
        <div className="poduim">
            <p>{winner} got the word!</p>
            <p>the word was: <span style={{color: 'blue'}}>{target}</span></p>
        </div>
    )
}