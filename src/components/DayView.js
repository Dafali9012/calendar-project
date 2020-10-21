import React, {useState} from 'react';

export default function dayView(){

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let tomorrowDate = String(today.getDate() + 1).padStart(2, '0');
    let yesterdayDate = String(today.getDate() + 1).padStart(2, '0');
    let tomorrow = new Date();
    let yesterday = new Date();

    today = yyyy + '-' + dd + '-' + mm;
    tomorrow = tomorrowDate;
    yesterday = yesterdayDate;

    return (
        <div className="container justify-content-center mt-4">
            <section className="row d-flex justify-content-around">
                <h4>{yesterday}</h4>
                <h1>{today}</h1>
                <h4>{tomorrow}</h4>
            </section>
                <h3 className="mt-3 mb-3">Your Events</h3>
                <p className="underLine" />
                <h6 className="mt-4 ml-2">No Events</h6>
        </div>
    ) 
}