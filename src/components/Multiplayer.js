import React from 'react'
import 'firebase/compat/database';
import {supabase} from './supabaseInit'
import {Input, Button} from '@mui/material';
import { useEffect } from 'react';
// async function insertRoom(props) {
//     const { data, error } = await supabase
//     .from('rooms')
//     .insert([
//       { players: {props.name: } }
//     ])
// }

async function updatePlayers(props) {
    const { data, error } = await supabase
    .from('rooms')
    .update({ name: 'Middle Earth' })
    .match({ id: props.currentRoom })
}

export default function Multiplayer() {
    
    const [name, setName] = React.useState('')

    return (
        <div className="multiplayer">
            <Input onChange={(e) => {setName(e)}} placeholder='name' />
            {/* <Button onClick={() => {insertRoom()}}>Create Game</Button> */}
        </div>
    )
}