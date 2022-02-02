import React from 'react'

export default function PlayerListItem(props) {
    return (
        <div className="player-list-item">
            <div className="player-list-item-name">{props.user}</div>
        </div>
    )
}