import React from 'react'
import "../../App.css";
import InputSlider from '../Slider'
import FOVSlider from "../FOVSlider"
import "./Settings.css"

export default function Settings () {
    return(
        <>
            <div className="slider-container">
                <InputSlider forwhat="sensix"/>
                <InputSlider forwhat="sensiy"/>
                <FOVSlider />
            </div>
            
        </>
    )
}