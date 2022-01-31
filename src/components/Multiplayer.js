import React from 'react'
import {database} from './firebaseInit'
import 'firebase/compat/database';
import { set, ref } from 'firebase/database';

export default function Multiplayer() {

    const [players, setPlayers] = React.useState([]);
    const roomsRef = ref(database, 'rooms');
    set(ref(database, 'rooms' + roomsRef.key), {
        players: [],
    })
    return (
        <div className="multiplayer">
        </div>
    )
}