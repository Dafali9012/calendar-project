import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../Store";


export default function Calendar(){

    const [user, setUser] = useContext(UserContext);
    const [view, setView] = useState("Month");
    const [funFact, setFunFact] = useState();
    const [viewDate, setViewDate] = useState(new Date());
    let dateNow = new Date();
    let calendarData = [];

    viewDate.setHours(0,0,0,0);
    dateNow.setHours(0,0,0,0);
    
    useEffect(()=>{
        fetchFunFact()
    },[])

    const fetchFunFact = async () =>{
        //'random' = new fact each request, 'today' = Updates every 24 hours
        const resp = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const data = await resp.json();
        setFunFact(data.text);
    }


    function monthName(date) {
        let a = new Date(date.getTime());
        let firstMonth;
        let secondMonth;
        if(view==="Week") {
            while(a.getDay()!==1) {
                a.setDate(a.getDate()-1);
            }
            firstMonth = a.toLocaleDateString("en-US", { month: 'long' });
            a.setDate(a.getDate()+6);
            secondMonth = a.toLocaleDateString("en-US", { month: 'long' });
            if(secondMonth===firstMonth) return firstMonth;
            return firstMonth+" - "+secondMonth;
        }
        return a.toLocaleDateString("en-US", { month: 'long' });
    }

    function yearName(date) {
        let a = new Date(date.getTime());
        let firstYear;
        let secondYear;
        if(view==="Week") {
            while(a.getDay()!==1) {
                a.setDate(a.getDate()-1);
            }
            firstYear = a.getFullYear();
            a.setDate(a.getDate()+6);
            secondYear = a.getFullYear();
            if(secondYear===firstYear) return firstYear;
            return firstYear+" - "+secondYear;
        }
        return a.getFullYear();;
    }

    function buildMonth() {
        let a = new Date(viewDate.getTime());
        a.setDate(1);
        let b = new Date(a.getTime());
        b.setMonth(a.getMonth()+1);
        a.setDate(a.getDate() - (a.getDay()+6)%7);
        b.setDate(b.getDate() + 7 - (b.getDay()+6)%7);
        while(a.valueOf() < b.valueOf()) {
            calendarData.push(new Date(a.getTime()));
            a.setDate(a.getDate()+1);
        }
    }

    function buildWeek() {
        let a = new Date(viewDate.getTime());
        a.setDate(a.getDate() - (a.getDay()+6)%7);
        for(let x = 0; x < 7; x++) {
            calendarData.push(new Date(a.getTime()));
            a.setDate(a.getDate()+1);
        }
    }

    function next() {
        let a = new Date(viewDate.getTime());
        if(view==="Month") {
            a.setMonth(a.getMonth()+1);
            a.setDate(1);
        } else if(view==="Week") {
            a.setDate(a.getDate()+7);
        }
        setViewDate(new Date(a.getTime()));
    }

    function prev() {
        let a = new Date(viewDate.getTime());
        if(view==="Month") {
            a.setMonth(a.getMonth()-1);
            a.setDate(1);
        } else if(view==="Week") {
            a.setDate(a.getDate()-7);
        }
        setViewDate(new Date(a.getTime()));
    }

    function setToday() {
        setViewDate(dateNow.getTime());
    }

    function changeView() {
        if(view==="Month") setView("Week");
        else if(view==="Week") setView("Month");
    }

    function joinClasses(classes) {
        let result = "";
        for(let key in classes) {
            result = result.concat(classes[key]+" ");
        }
        result = result.substring(0,result.length-1);
        return result;
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
        <div className="d-flex flex-column mt-4">
            <div className="flex-shrink-0">
                <h3 className="row justify-content-center align-items-center">{yearName(viewDate)}</h3>
                {view==="Week"?<h4 className="row justify-content-center align-items-center mt-4">{monthName(viewDate)}</h4>:null}

                <div className="row align-items-center mt-4">
                    <button className="col-1 btn-sm btn-info" onClick={changeView}>{"view:"+view}</button>
                    <button className="col-1 btn-sm btn-info" onClick={setToday}>Today</button>
                    <div className="col-2"/>
                    <button className="col-1 btn-sm btn-info" onClick={prev}>{"<-"}</button>
                    <h4 className="col-2 text-center">{view==="Month"?monthName(viewDate):"Week "+getWeekNumber(viewDate)[1]}</h4>
                    <button className="col-1 btn-sm btn-info" onClick={next}>{"->"}</button>
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
            </div>
            <div className="row">    
                {calendarData.map((x,i)=>{
                    let classes = {col:"col-grid-7", background:"bg-secondary", text:"text-light"};
                    if(x.valueOf()===dateNow.valueOf()) classes = {...classes, background:"bg-info", text:"text-light"}
                    if(view!=="Week" && x.getMonth()!==viewDate.getMonth()) classes = {...classes, background:"bg-light", text:"text-muted"}
                    return <div className={joinClasses(classes)} key={i}>{x.getDate()}</div>
                })}
            </div>
            <div className="flex-shrink-0 my-5">
                <div className="row justify-content-center align-items-center"><strong>Fun fact of the day:</strong></div>
                <div className="row justify-content-center align-items-center">{funFact}</div>
            </div>
        </div>
    );
}
