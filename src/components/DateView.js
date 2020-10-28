import React, { useState, useEffect } from 'react';

export default function DateView(){

    let date = new Date().toDateString()
    

    return(
    <div className="container">
        <div className="row">
            <div className="col d-flex justify-content-center mt-5">{date}</div>
        </div>
        <div className="row">
            <div className="col d-flex justify-content-center mt-5">Events today:</div>
        </div>
    </div>
    );
}