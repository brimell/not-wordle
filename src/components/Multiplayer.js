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
    
    const currentRoom = sessionStorage.getItem('currentRoom')
    const [name, setName] = React.useState('')

    const CustomTextField = styled(TextField)({
        "& .MuiInput-underline:after": {
          borderBottomColor: "white"
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white"
          },
          "&:hover fieldset": {
            borderColor: "white"
          },
          "&.Mui-focused fieldset": {
            borderColor: "white"
          }
        }
      });
    
      const emailRef = useRef(null);
      const passwordRef = useRef(null);
      const nameRef = useRef(null);
      
    return (
        <div className="multiplayer">
            <Input onChange={(e) => {setName(e)}} placeholder='name' />
            {/* <Button onClick={() => {insertRoom()}}>Create Game</Button> */}
            <CustomTextField inputRef={emailRef} className="input-div" id="email-input" label="Email..." />
      <CustomTextField inputRef={passwordRef} className="input-div" id="password-input" color='success' type="password" label="Password..." />
      <Button variant="contained" onClick={signIn} >Sign In</Button>
    </div>
    }
    {logOrSign === 'signup' &&
    <div className="content">
    <CustomTextField inputRef={emailRef} className="input-div" id="email-input" label="Email..." />
    <CustomTextField inputRef={nameRef} className="input-div" id="username-input" label="Username..." />
    <CustomTextField inputRef={passwordRef} className="input-div" id="password-input" color='success' type="password" label="Password..." />
    <Button variant="contained" onClick={signUp} >Sign Up</Button>
        </div>
    )
}