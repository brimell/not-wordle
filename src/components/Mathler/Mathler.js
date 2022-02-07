import React from 'react'
import './Mathler.css'
import $ from 'jquery'

export default function Mathler() {

    $('body').css('background-color', '#f5f5f5')

    return (
        <div className="mathler">
            <iframe id='mathlerIframe' title='mathler' className='mathlerIframe' src="https://www.mathler.com/" frameborder="0"></iframe>
        </div>
    )
}