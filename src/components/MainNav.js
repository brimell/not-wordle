import React from 'react'
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import $ from "jquery";

export default function MainNav(props) {
    const settings = props.settings
    const setSettings = props.setSettings
    const open = props.open
    const setSeedUpdate = props.setSeedUpdate

    return (
        <div className="navContainer">
            <h1>not wordle</h1>
            <div className="settingsIcon">
                <button
                id="settingsButton"
                onClick={() => {
                    setSeedUpdate(Number(sessionStorage.getItem("seed")) || false)
                    setSettings((a) => !a);
                    if (window.screen.width <= 800) {
                    console.log("test");
                    }
                }}
                >
                {settings ? (
                    <CloseIcon
                    fontSize={$(window).height() > 510 ? "large" : "small"}
                    />
                ) : (
                    <SettingsIcon
                    fontSize={$(window).height() > 510 ? "large" : "small"}
                    />
                )}
                </button>
            </div>
            <div className="personIcon">
                <button id="personButton" onClick={open}>
                <PersonIcon
                    fontSize={$(window).height() > 510 ? "large" : "small"}
                />
                </button>
            </div>
        </div>
    )
}