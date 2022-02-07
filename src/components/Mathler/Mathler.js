import React from 'react'
import './Mathler.css'
import $ from 'jquery'

export default function Mathler() {

    $("#mathlerIframe").contents().find("body").attr("style","color:transparant")
    return (
        <div className="mathler">
            <iframe id='mathlerIframe' title='mathler' className='mathlerIframe' src="https://www.mathler.com/" frameborder="0"></iframe>
        </div>
    )
}