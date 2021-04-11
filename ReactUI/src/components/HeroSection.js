import React from 'react'
import "../App.css"
import {Button} from './Button'
import "./HeroSection.css";

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="videos/Sparber_Trim.mp4" autoPlay loop muted />
            <h1>Improve your aim</h1>
            <p>Become a real g-g-g-gamer</p>
            <div className="hero-btns">

                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large" onClick={loadClassic}>Classic Mode</Button>
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large" onClick={loadFlick}>Flick Mode</Button>
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large" onClick={loadClassicTryhard}>Classic Try Hard Mode</Button>
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large" onClick={loadFlickTryhard}>Flick Try Hard Mode</Button>
            </div>
        </div>
    )
}

function loadClassic(){
    window.location.replace("classic/")
}

function loadFlick(){
    window.location.replace("flick/")
}

function loadClassicTryhard(){
    window.location.replace("classicTryHard")
}

function loadFlickTryhard(){
    window.location.replace("flickTryHard")
}

export default HeroSection
