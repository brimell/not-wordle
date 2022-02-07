import React from 'react'
import './Mathler.css'

export default function Mathler() {

    return (
        <div className="mathler">
            <iframe id='mathlerIframe' title='mathler' className='mathlerIframe' src="https://www.mathler.com/" frameborder="0"></iframe>
        </div>
    )
}