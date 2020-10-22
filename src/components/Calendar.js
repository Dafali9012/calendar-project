import React, { useState, useEffect } from 'react';

export default function Calendar(){

    const [view, setView] = useState("Month");
    const [funFact, setFunFact] = useState();

    useEffect(()=>{
        fetchFunFact()
    },[])

    const [date, setDate] = useState(new Date());
    let dateNow = new Date();
    let days = "";

    const fetchFunFact = async () =>{
        const resp = await fetch('https://uselessfacts.jsph.pl/random.json?language=en'); //'random' = new fact each request, 'today' = Updates every 24 hours
        const data = await resp.json();
        setFunFact(data.text);
    }

    function monthLength(month){
        return new Date(date.getFullYear(), month+1, 0).getDate();
    }

    function dayName(dayDate) {
        return new Date(date.getFullYear(), date.getMonth(), dayDate).toLocaleDateString("en-US", { weekday: 'long' });
    }

    function monthName(dateOfMonth) {
        let weekDate = dateOfMonth;
        let firstMonth;
        let secondMonth;
        while(dayName(weekDate.getDate())!=="Monday") {
            weekDate = new Date(weekDate.setDate(weekDate.getDate()-1));
        }
        firstMonth = weekDate.toLocaleDateString("en-US", { month: 'long' });
        if(view==="Week") {
            weekDate = new Date(weekDate.setDate(weekDate.getDate()+6));
            secondMonth = weekDate.toLocaleDateString("en-US", { month: 'long' });
            if(secondMonth===firstMonth) return firstMonth;
            return firstMonth+" - "+secondMonth;
        }
        return firstMonth;
    }

    function year(dateOfYear) {
        let weekDate = dateOfYear;
        let firstYear;
        let secondYear;
        while(dayName(weekDate.getDate())!=="Monday") {
            weekDate = new Date(weekDate.setDate(weekDate.getDate()-1));
        }
        firstYear = weekDate.getFullYear();
        if(view==="Week") {
            weekDate = new Date(weekDate.setDate(weekDate.getDate()+6));
            secondYear = weekDate.getFullYear();
            if(secondYear===firstYear) return firstYear;
            return firstYear+" - "+secondYear;
        }
        return firstYear;
    }

    function buildMonth() {
        for(let x of Array(monthLength(date.getMonth())).keys()) {
            days = days.concat((x+1)+".");
            days = dayName(x+1)==="Sunday"?days.concat("?"):days.concat("-");
        }
        days = days.substring(0,days.length-1);
    }

    function buildWeek() {
        let weekDate = date;
        while(dayName(weekDate.getDate())!=="Monday") {
            weekDate = new Date(weekDate.setDate(weekDate.getDate()-1));
        }
        for(let x = 0; x < 7; x++) {
            days = days.concat(weekDate.getDate()+".-");
            weekDate = new Date(weekDate.setDate(weekDate.getDate()+1));
        }
        days = days.substring(0,days.length-1);
    }

    function next() {
        if(view==="Month") {
            let newDate = new Date(date.setMonth(date.getMonth()+1));
            setDate(newDate);
        } else if(view==="Week") {
            let newDate = new Date(date.setDate(date.getDate()+7));
            setDate(newDate);
        }
    }

    function prev() {
        if(view==="Month") {
            let newDate = new Date(date.setMonth(date.getMonth()-1));
            setDate(newDate);
        } else if(view==="Week") {
            let newDate = new Date(date.setDate(date.getDate()-7));
            setDate(newDate);
        }
    }

    function setToday() {
        setDate(dateNow);
    }

    function changeView() {
        if(view==="Month") setView("Week");
        else if(view==="Week") setView("Month");
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
            <h3 className="row justify-content-center align-items-center py-4">{year(date)}</h3>
            {view==="Week"?<h4 className="row justify-content-center align-items-center mb-4">{monthName(date)}</h4>:null}

            <div className="row align-items-center">
                <button className="col-1 btn-sm btn-light" onClick={changeView}>{"view:"+view}</button>
                <button className="col-1 btn-sm btn-light" onClick={setToday}>Today</button>
                <div className="col-2"/>
                <button className="col-1 btn-sm btn-light" onClick={prev}>{"<-"}</button>
                <h4 className="col-2 text-center">{view==="Month"?monthName(date):"Week "+getWeekNumber(date)[1]}</h4>
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
                    return <div className="col bg-light m-1" key={i}>{x}</div>
                })}
            </div>
            <div className="row h-10">
                {days.split("?")[1]?days.split("?")[1].split("-").map((x,i)=>{
                    return <div className="col bg-light m-1" key={i}>{x}</div>
                }):null}
            </div>
            <div className="row h-10">
                {days.split("?")[2]?days.split("?")[2].split("-").map((x,i)=>{
                    return <div className="col bg-light m-1" key={i}>{x}</div>
                }):null}
            </div>
            <div className="row h-10">
                {days.split("?")[3]?days.split("?")[3].split("-").map((x,i)=>{
                    return <div className="col bg-light m-1" key={i}>{x}</div>
                }):null}
            </div>
            <div className="row h-10">
                {days.split("?")[4]?days.split("?")[4].split("-").map((x,i)=>{
                    return <div className="col bg-light m-1" key={i}>{x}</div>
                }):null}
                {days.split("?")[4]?[...Array(7-days.split("?")[4].split("-").length).keys()].map((x,i)=>{
                    return <div className="col m-1" key={i}></div>
                }):null}
            </div>
            <div className="row h-10">
                {days.split("?")[5]?days.split("?")[5].split("-").map((x,i)=>{
                    return <div className="col bg-light m-1" key={i}>{x}</div>
                }):null}
                {days.split("?")[5]?[...Array(7-days.split("?")[5].split("-").length).keys()].map((x,i)=>{
                    return <div className="col m-1" key={i}></div>
                }):null}
            </div>
            <div className="row justify-content-center align-items-center mt-5" style={{fontWeight: "bold"}}>Fun fact of the day:</div>
            <div className="row justify-content-center align-items-center">{funFact}</div>
        </div>
    );
}
