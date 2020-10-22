import React, { useState } from 'react';

export default function Calendar(){

    const [view, setView] = useState("month");
    const [date, setDate] = useState(new Date());
    let days = "";

    function monthLength(month){
        return new Date(date.getFullYear(), month+1, 0).getDate();
    }

    function dayName(dayDate) {
        return new Date(date.getFullYear(), date.getMonth(), dayDate).toLocaleDateString("en-US", { weekday: 'long' });
    }

    function monthName(month) {
        return new Date(date.getFullYear(), month, date.getDate()).toLocaleDateString("en-US", { month: 'long' });
    }

    function buildMonth() {
        for(let x of Array(monthLength(date.getMonth())).keys()) {
            days = days.concat((x+1)+". "+dayName(x+1).substring(0,3));
            days = dayName(x+1)==="Sunday"?days.concat("?"):days.concat("-");
        }
        days = days.substring(0,days.length-1);
    }

    function buildWeek() {

    }

    function nextMonth(){
        let newDate = new Date(date.setMonth(date.getMonth()+1));
        setDate(newDate);
    }

    function prevMonth(){
        let newDate = new Date(date.setMonth(date.getMonth()-1));
        setDate(newDate);
    }

    //Calculate weeknumber
    // eslint-disable-next-line
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

    if(view==="month") buildMonth();
    else if(view==="week") buildWeek();

    return (
        <div className="pt-4 h-100">
            <h3 className="row justify-content-center align-items-center">{date.getFullYear()}</h3>
            {/*<h5 className="row justify-content-center align-items-center mb-4">{"v."+date.getWeek()}</h5>*/}

            <div className="row justify-content-center align-items-center">
                <button className="col-1 btn-sm btn-primary" onClick={prevMonth}>Prev Month</button>
                <h4 className="col-3 text-center">{monthName(date.getMonth())}</h4>
                <button className="col-1 btn-sm btn-primary" onClick={nextMonth}>Next Month</button>
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
                {days.split("?")[1].split("-").map((x,i)=>{
                    return <div className="col bg-light m-1" key={i}>{x}</div>
                })}
            </div>
            <div className="row h-10">
                {days.split("?")[2].split("-").map((x,i)=>{
                    return <div className="col bg-light m-1" key={i}>{x}</div>
                })}
            </div>
            <div className="row h-10">
                {days.split("?")[3].split("-").map((x,i)=>{
                    return <div className="col bg-light m-1" key={i}>{x}</div>
                })}
            </div>
            <div className="row h-10">
                {days.split("?")[4]!==undefined?days.split("?")[4].split("-").map((x,i)=>{
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
        </div>
    );
}
