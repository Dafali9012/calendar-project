import React, { useState, useEffect } from 'react';

export default function DateView(){

    let mainDate = new Date();
    let nextDate = new Date();
    let previousDate = new Date();
    let dd = String(mainDate.getDate()).padStart(2, '0');
    let mm = String(mainDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = mainDate.getFullYear();
    let nextDateDate = String(mainDate.getDate() + 1).padStart(2, '0');
    let previousDateDate = String(mainDate.getDate() -1).padStart(2, '0');

    mainDate = yyyy + '-' + dd + '-' + mm;
    nextDate = yyyy + '-' + nextDateDate + '-' + mm;
    previousDate = yyyy + '-' + previousDateDate + '-' + mm;

    //Replace nextDate(date) to mainDate(date)
    function editmainDateFromPreviousDate(){
        mainDate = previousDateDate;
        return mainDate;
    }
    return (
        <div className="container justify-content-center mt-4">
            <section className="row d-flex justify-content-around">
                {/* Knappen finns endast som test så länge datumen inte är klickbara */}
                <button className="btn-primary w-80 h-50"
                onClick={() => editmainDateFromPreviousDate()}>Previous</button>

                <h5 className="col-2 side-date"> {previousDate} </h5>
                <h1 className="col-4 text-center"> {mainDate} </h1>
                <h5 className="col-2 side-date"> {nextDate} </h5>

                {/* Knappen finns endast som test så länge datumen inte är klickbara */}
                <button className="btn-primary w-80 h-50">Next</button>
            </section>
                <h3 className="mt-3 mb-3">Your Events</h3>
                <p className="underLine" />
                <h6 className="mt-4 ml-2">No Events</h6>
        </div>
    ) 
}