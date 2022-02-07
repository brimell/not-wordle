import React from 'react'
import './Mathler.css'
import $ from 'jquery'

export default function Mathler() {

    // $('.bg-white').style.background = 'transparant'
    return (
        <div className="mathler">
            <iframe title='mathler' className='mathlerIframe' src="https://www.mathler.com/" frameborder="0"></iframe>
        </div>
    )
}