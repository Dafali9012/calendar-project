import React, { useState, useEffect, useContext } from 'react';
import { EventListContext, InviteContext, UserContext } from "../Store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Calendar(props){

    // eslint-disable-next-line
    const [user,setUser] = useContext(UserContext);
    // eslint-disable-next-line
    const [inviteList, setInviteList] = useContext(InviteContext);
    // eslint-disable-next-line
    const [eventList, setEventList] = useContext(EventListContext);
    const [view, setView] = useState("month");
    const [funFact, setFunFact] = useState();
    const [viewDate, setViewDate] = useState(new Date());
    let dateNow = new Date();
    let calendarData = [];

    viewDate.setHours(0,0,0,0);
    dateNow.setHours(0,0,0,0);
    
    useEffect(()=>{
        fetchFunFact()
        // eslint-disable-next-line
    },[]);

    const fetchFunFact = async () =>{
        //'random' = new fact each request, 'today' = Updates every 24 hours
        const resp = await fetch('https://uselessfacts.jsph.pl/today.json?language=en');
        const data = await resp.json();
        setFunFact(data.text);
    }

    function monthName(date) {
        let a = new Date(date.getTime());
        let firstMonth;
        let secondMonth;
        if(view==="week") {
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
        if(view==="week") {
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

    function modifyDate(operator="+", measure="month", amount=1) {
        let a = new Date(viewDate.getTime());
        if(operator==="+") {
            if(measure==="year") {
                a.setFullYear(a.getFullYear()+amount);
                a.setDate(1);
            } else if(measure==="month") {
                a.setMonth(a.getMonth()+amount);
                a.setDate(1);
            } else if(measure==="week") {
                a.setDate(a.getDate()+7*amount);
            }
        } else if(operator==="-") {
            if(measure==="year") {
                a.setFullYear(a.getFullYear()-amount);
                a.setDate(1);
            } else if(measure==="month") {
                a.setMonth(a.getMonth()-amount);
                a.setDate(1);
            } else if(measure==="week") {
                a.setDate(a.getDate()-7*amount);
            }
        }
        
        setViewDate(new Date(a.getTime()));
    }

    function setToday() {
        setViewDate(new Date(dateNow.getTime()));
    }

    function changeView() {
        if(view==="month") setView("week");
        else if(view==="week") setView("month");
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

    if(view==="month") buildMonth();
    else if(view==="week") buildWeek();

    return (
        <div className="d-flex flex-column pt-4">
            
            <div className="d-flex flex-column align-items-center mt-2 mt-mb-4">
                <div className="d-flex flex-row justify-content-between w-100 w-md-45 w-lg-35">
                    <button className="btn-sm btn-info" onClick={()=>modifyDate("-", "year", 1)}><FontAwesomeIcon icon={faArrowLeft}/></button>
                    <h3 className="text-center mb-0 mx-4">{yearName(viewDate)}</h3>
                    <button className="btn-sm btn-info" onClick={()=>modifyDate("+", "year", 1)}><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>

                <div className="d-flex flex-row justify-content-between mt-2 w-100 w-md-50 w-lg-40">
                    <button className="btn-sm btn-info" onClick={()=>modifyDate("-", "month", 1)}><FontAwesomeIcon icon={faArrowLeft}/></button>
                    <h4 className="text-center mb-0 mx-4">{monthName(viewDate)}</h4>
                    <button className="btn-sm btn-info" onClick={()=>modifyDate("+", "month", 1)}><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
                
                {view==="week"?
                <div className="d-flex flex-row justify-content-between mt-2 w-100 w-md-45 w-lg-35">
                    <button className="btn-sm btn-info" onClick={()=>modifyDate("-", "week", 1)}><FontAwesomeIcon icon={faArrowLeft}/></button>
                    <h4 className="text-center mb-0 mx-4">{"Week "+getWeekNumber(viewDate)[1]}</h4>
                    <button className="btn-sm btn-info" onClick={()=>modifyDate("+", "week", 1)}><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
                :null}

                <div className="d-flex justify-content-center mt-4">
                    <button className="btn-sm btn-info mr-2" onClick={changeView}>switch view</button>
                    <button className="btn-sm btn-info ml-2" onClick={setToday}>Today</button>
                </div>

            </div>
            <div className="row my-2 border">
                <h6 className="col-grid-7 h-25 text-center">Mon</h6>
                <h6 className="col-grid-7 h-25 text-center">Tue</h6>
                <h6 className="col-grid-7 h-25 text-center">Wed</h6>
                <h6 className="col-grid-7 h-25 text-center">Thu</h6>
                <h6 className="col-grid-7 h-25 text-center">Fri</h6>
                <h6 className="col-grid-7 h-25 text-center">Sat</h6>
                <h6 className="col-grid-7 h-25 text-center">Sun</h6>
            </div>
            <div className="row">    
                {calendarData.map((x,i)=>{
                    let numEvents = 0;
                    for(let y of eventList) {
                        let startDateSplit = y.startDate.split("-");
                        let endDateSplit = y.endDate.split("-");
                        let startDate = new Date(startDateSplit[0]+"-"+startDateSplit[1]+"-"+startDateSplit[2]);
                        let endDate = new Date(endDateSplit[0]+"-"+endDateSplit[1]+"-"+endDateSplit[2]);
                        startDate.setHours(0,0,0,0);
                        endDate.setHours(0,0,0,0);
                        if(x.valueOf() >= startDate.valueOf() && x.valueOf() <= endDate.valueOf()) {
                            numEvents++;
                        }
                    }
                    let classes = {col:"col-grid-7", background:"bg-secondary", text:"text-light", selectable:"unselectable", cssClass:"dateBox"};
                    if(x.valueOf()===dateNow.valueOf()) classes = {...classes, background:"bg-info", text:"text-light"}
                    if(view!=="week" && x.getMonth()!==viewDate.getMonth()) classes = {...classes, background:"bg-light", text:"text-muted"}
                    return <div className={joinClasses(classes)} key={i} style={{cursor:"pointer"}}
                    onClick={()=>props.redirectCallback({pathname:"/date/"+x.getFullYear()+"-"+(x.getMonth()+1)+"-"+x.getDate()})}>
                        {x.getDate()}
                        {numEvents>0?<div className="event-marker text-light mt-3 ml-1">{numEvents>9?"9+":numEvents}</div>:null}
                    </div>
                })}
            </div>
            <div className="mt-4">
                <div className="row justify-content-center align-items-center"><strong>Fun fact of the day:</strong></div>
                <div className="row justify-content-center align-items-center">{funFact}</div>
            </div>
        </div>
    );
}
