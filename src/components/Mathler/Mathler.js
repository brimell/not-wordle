import React from 'react'
import './Mathler.css'
import $ from 'jquery'

export default function Mathler() {

    $("#mathlerIframe").contents().find("img").attr("style","width:100%;height:100%")
    return (
        <div className="mathler">
            <iframe id='mathlerIframe' title='mathler' className='mathlerIframe' src="https://www.mathler.com/" frameborder="0"></iframe>
        </div>
    )
}