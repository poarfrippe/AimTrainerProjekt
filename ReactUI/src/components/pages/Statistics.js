import React, { useState,useParams } from 'react'
import "../../App.css"
import StatisticsForm from '../StatisticsForm'
import Navbar2 from '../Navbar2'


function Statistics(){
    const [mode, setMode] =useState("classic");
    return(
        <>
            <Navbar2 mode={mode} setMode={setMode} />
            <StatisticsForm mode={mode} />
        </>
    );
}

export default Statistics;