import React, { useState, useEffect } from 'react';

export default function Calendar(){

    const [funFact, setFunFact] = useState();
    
    useEffect(()=>{
        fetchFunFact()
    },[])
    
    const [view, setView] = useState("Month");
    const [viewDate, setViewDate] = useState(new Date());
    let dateNow = new Date();
    let days = "";

    const fetchFunFact = async () =>{
        const resp = await fetch('https://uselessfacts.jsph.pl/random.json?language=en'); //'random' = new fact each request, 'today' = Updates every 24 hours
        const data = await resp.json();
        setFunFact(data.text);
    }

    function monthLength(month){
        return new Date(viewDate.getFullYear(), month+1, 0).getDate();
    }

    function dayName(date) {
        return new Date(viewDate.getFullYear(), viewDate.getMonth(), date).toLocaleDateString("en-US", { weekday: 'long' });
    }

    function monthName(fullDate) {
        let viewDateCopy = new Date(fullDate);
        let firstMonth;
        let secondMonth;
        if(view==="Week") {
            while(viewDateCopy.getDay()!==1) {
                viewDateCopy.setDate(viewDateCopy.getDate()-1);
            }
            firstMonth = viewDateCopy.toLocaleDateString("en-US", { month: 'long' });
            viewDateCopy.setDate(viewDateCopy.getDate()+6);
            secondMonth = viewDateCopy.toLocaleDateString("en-US", { month: 'long' });
            if(secondMonth===firstMonth) return firstMonth;
            return firstMonth+" - "+secondMonth;
        }
        return viewDateCopy.toLocaleDateString("en-US", { month: 'long' });
    }

    function year(fullDate) {
        let viewDateCopy = new Date(fullDate);
        let firstYear;
        let secondYear;
        if(view==="Week") {
            while(viewDateCopy.getDay()!==1) {
                viewDateCopy.setDate(viewDateCopy.getDate()-1);
            }
            firstYear = viewDateCopy.getFullYear();
            viewDateCopy.setDate(viewDateCopy.getDate()+6);
            secondYear = viewDateCopy.getFullYear();
            if(secondYear===firstYear) return firstYear;
            return firstYear+" - "+secondYear;
        }
        return viewDateCopy.getFullYear();;
    }

    function buildMonth() {
        for(let x of Array(monthLength(viewDate.getMonth())).keys()) {
            days = days.concat((x+1)+".");
            days = dayName(x+1)==="Sunday"?days.concat("?"):days.concat("-");
        }
        days = days.substring(0,days.length-1);
    }

    function buildWeek() {
        let viewDateCopy = new Date(viewDate);
        while(viewDateCopy.getDay()!==1) {
            viewDateCopy.setDate(viewDateCopy.getDate()-1);
        }
        for(let x = 0; x < 7; x++) {
            days = days.concat(viewDateCopy.getDate()+".-");
            viewDateCopy.setDate(viewDateCopy.getDate()+1);
        }
        days = days.substring(0,days.length-1);
    }

    function next() {
        let viewDateCopy = new Date(viewDate);
        if(view==="Month") {
            viewDateCopy.setMonth(viewDateCopy.getMonth()+1);
            viewDateCopy.setDate(1);
        } else if(view==="Week") {
            viewDateCopy.setDate(viewDateCopy.getDate()+7);
        }
        setViewDate(new Date(viewDateCopy));
    }

    function prev() {
        let viewDateCopy = new Date(viewDate);
        if(view==="Month") {
            viewDateCopy.setMonth(viewDateCopy.getMonth()-1);
            viewDateCopy.setDate(1);
        } else if(view==="Week") {
            viewDateCopy.setDate(viewDateCopy.getDate()-7);
        }
        setViewDate(new Date(viewDateCopy));
    }

    function setToday() {
        setViewDate(dateNow);
    }

    function changeView() {
        if(view==="Month") setView("Week");
        else if(view==="Week") setView("Month");
    }
   function getThisDate(date, month, year){
        console.log(date + month + year)
    }

    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return [d.getUTCFullYear(), weekNo];
    }

    if(view==="Month") buildMonth();
    else if(view==="Week") buildWeek();

    return (
        <div className="h-100">
            <h3 className="row justify-content-center align-items-center py-4">{year(viewDate)}</h3>
            {view==="Week"?<h4 className="row justify-content-center align-items-center mb-4">{monthName(viewDate)}</h4>:null}

            <div className="row align-items-center">
                <button className="col-1 btn-sm btn-light" onClick={changeView}>{"view:"+view}</button>
                <button className="col-1 btn-sm btn-light" onClick={setToday}>Today</button>
                <div className="col-2"/>
                <button className="col-1 btn-sm btn-light" onClick={prev}>{"<-"}</button>
                <h4 className="col-2 text-center">{view==="Month"?monthName(viewDate):"Week "+getWeekNumber(viewDate)[1]}</h4>
                <button className="col-1 btn-sm btn-light" onClick={next}>{"->"}</button>
            </div>
            <div className="row my-4 border">
                <h5 className="col text-center">Monday</h5>
                <h5 className="col text-center">Tuesday</h5>
                <h5 className="col text-center">Wednesday</h5>
                <h5 className="col text-center">Thursday</h5>
                <h5 className="col text-center">Friday</h5>
                <h5 className="col text-center">Saturday</h5>
                <h5 className="col text-center">Sunday</h5>
            </div>

            <div className="row h-10">
                {[...Array(7-days.split("?")[0].split("-").length).keys()].map((x,i)=>{
                    return <div className="col mx-1" key={i}></div>
                })}
                {days.split("?")[0].split("-").map((x,i)=>{
                    return <div className="col bg-light m-1" onClick={e => getThisDate(x, monthName(viewDate), year(viewDate))} key={i}>{x}</div>
                })}
            </div>
            {view==="Month"?
            <>
                <div className="row h-10">
                    {days.split("?")[1].split("-").map((x,i)=>{
                        return <div className="col bg-light m-1" onClick={e => getThisDate(x, monthName(viewDate), year(viewDate))} key={i}>{x}</div>
                    })}
                </div>
                <div className="row h-10">
                    {days.split("?")[2].split("-").map((x,i)=>{
                        return <div className="col bg-light m-1" onClick={e => getThisDate(x, monthName(viewDate), year(viewDate))} key={i}>{x}</div>
                    })}
                </div>
                <div className="row h-10">
                    {days.split("?")[3].split("-").map((x,i)=>{
                        return <div className="col bg-light m-1" onClick={e => getThisDate(x, monthName(viewDate), year(viewDate))} key={i}>{x}</div>
                    })}
                </div>
                {days.split("?")[4]?<div className="row h-10">
                    {days.split("?")[4].split("-").map((x,i)=>{
                        return <div className="col bg-light m-1" onClick={e => getThisDate(x, monthName(viewDate), year(viewDate))} key={i}>{x}</div>
                    })}
                    {[...Array(7-days.split("?")[4].split("-").length).keys()].map((x,i)=>{
                        return <div className="col m-1" key={i}></div>
                    })}
                </div>:null}
                {days.split("?")[5]?<div className="row h-10">
                    {days.split("?")[5].split("-").map((x,i)=>{
                        return <div className="col bg-light m-1" onClick={e => getThisDate(x, monthName(viewDate), year(viewDate))} key={i}>{x}</div>
                    })}
                    {[...Array(7-days.split("?")[5].split("-").length).keys()].map((x,i)=>{
                        return <div className="col m-1" key={i}></div>
                    })}
                </div>:null}
            </>:null}
            <div className="row justify-content-center align-items-center mt-5"><strong>Fun fact of the day:</strong></div>
            <div className="row justify-content-center align-items-center">{funFact}</div>
        </div>
    );
}
