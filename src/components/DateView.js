import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EventListContext } from '../Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function DateView(props){

    const params = useParams();
    // eslint-disable-next-line
    const [eventList, setEventList] = useContext(EventListContext);
    // eslint-disable-next-line
    const [dateFact, setDateFact] = useState();

    const fetchDateFact = async () =>{
        const baseURL = 'http://numbersapi.com/';
        const date = props.locationPathname.split("/").pop().split("-")[1]+'/'+props.locationPathname.split("/").pop().split("-")[2];
        const extension ='/date';
        const resp = await fetch(baseURL+date+extension);
        const data = await resp.text();
        setDateFact(data);
    }

    useEffect(()=>{
        fetchDateFact();
        // eslint-disable-next-line
    },[]);

    let dateToday = new Date();
    let viewDate = new Date();
    if(params.date) {
        viewDate = new Date(params.date);
    }

    dateToday.setHours(0,0,0,0);
    viewDate.setHours(0,0,0,0);

    if(isNaN(viewDate.getDate())) props.redirectCallback({pathname:"/"});

    let dateSplit = [viewDate.getFullYear(), (viewDate.getMonth()+1), viewDate.getDate()];

    for(let x = 0; x < dateSplit.length; x++) {
        dateSplit[x] = dateSplit[x].toString().padStart(2, "0");
    };

    function previous(){
        viewDate.setDate(viewDate.getDate()-1)
        dateSplit = [viewDate.getFullYear(), (viewDate.getMonth()+1), viewDate.getDate()];
        props.redirectCallback({pathname:"/date/"+dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]});
    }
    function next(){
        viewDate.setDate(viewDate.getDate()+1)
        dateSplit = [viewDate.getFullYear(), (viewDate.getMonth()+1), viewDate.getDate()];
        props.redirectCallback({pathname:"/date/"+dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]});
    }

    return (
        <div className="mt-4">
            <section className="d-flex d-row justify-content-center align-items-center">
                <button className="btn-sm btn-primary" onClick={previous}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <h4 className="text-center mar-0 mx-4"> {dateSplit.join("-")} </h4>
                <button className="btn-sm btn-primary" onClick={next}><FontAwesomeIcon icon={faArrowRight} /></button>
            </section>
            { viewDate.valueOf()>=dateToday.valueOf()?
            <div className="d-flex flex-column align-items-center mt-4">
                <button className="btn btn-primary" onClick={()=>props.redirectCallback({pathname:"/date/"+params.date+"/create-event"})}>Create Event</button>
            </div>:null}
            <h3 className="mt-3 mb-3">Events</h3>
            <div style={{width:"100%", height:"1px", backgroundColor:"black"}}/>
            <div>
                {eventList.map((x,i)=>{
                    let startDateSplit = x.startDate.split("-");
                    let endDateSplit = x.endDate.split("-");
                    let startDate = new Date(startDateSplit[0]+"-"+startDateSplit[1]+"-"+startDateSplit[2]);
                    let endDate = new Date(endDateSplit[0]+"-"+endDateSplit[1]+"-"+endDateSplit[2]);
                    startDate.setHours(0,0,0,0);
                    endDate.setHours(0,0,0,0);
                    if(viewDate.valueOf() >= startDate.valueOf() && viewDate.valueOf() <= endDate.valueOf()) {
                        return <div className="card my-2 text-center marx-20 py-2 scheduled" key={i} 
                        onClick={()=>props.redirectCallback({pathname:"/event", state:{event:x}})}>{x.title}</div>
                    }
                    return null;
                })}
            </div>
            <div>
                <div className="row justify-content-center align-items-center mt-5 ml-1"><strong>This date in history:</strong></div>
                <div className="row justify-content-center align-items-center text-center">{dateFact}</div>
            </div>
        </div>
    );
}
