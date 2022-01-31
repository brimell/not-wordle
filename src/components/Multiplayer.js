import React from 'react'
import firebase from './firebaseInit'
import 'firebase/compat/database';

const db = firebase.database()
export default function Multiplayer() {
    return (
        <div className="multiplayer">
            <form>
                onSubmit={(e) => {
                    e.preventDefault()
                    const gamesRef = db.ref("games")
                }}
            </form>
        </div>
    )
}