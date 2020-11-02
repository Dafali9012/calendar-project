import React, { useState, useContext, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {UserContext, EventListContext} from '../Store';

export default function DateView(){

    const params = useParams();
    // eslint-disable-next-line
    const [user, setUser] = useContext(UserContext);
    // eslint-disable-next-line
    const [eventList, setEventList] = useContext(EventListContext);
    const [redirect, setRedirect] = useState({pathname:params.date});
    // eslint-disable-next-line
    const [dateFact, setDateFact] = useState();

    const fetchDateFact = async () =>{
        const baseURL = 'http://numbersapi.com/';
        const date = redirect.pathname.split("/").pop().split("-")[1]+'/'+redirect.pathname.split("/").pop().split("-")[2];
        const extension ='/date';
        const resp = await fetch(baseURL+date+extension);
        const data = await resp.text();
        setDateFact(data);
    }

    useEffect(()=>{
        if(redirect.pathname && redirect.pathname!=="/event")fetchDateFact();
        // eslint-disable-next-line
    },[redirect]);

    if(redirect.pathname && redirect.pathname.split("/").pop() !== params.date) return <Redirect push to={redirect}/>

    let dateToday = new Date();
    let viewDate = new Date();
    if(params.date) {
        viewDate = new Date(params.date);
    }

    dateToday.setHours(0,0,0,0);
    viewDate.setHours(0,0,0,0);

    if(isNaN(viewDate.getDate())) setRedirect({path:"/"});

    let dateSplit = [viewDate.getFullYear(), (viewDate.getMonth()+1), viewDate.getDate()];

    for(let x = 0; x < dateSplit.length; x++) {
        dateSplit[x] = dateSplit[x].toString().padStart(2, "0");
    };

    function previous(){
        viewDate.setDate(viewDate.getDate()-1)
        dateSplit = [viewDate.getFullYear(), (viewDate.getMonth()+1), viewDate.getDate()];
        setRedirect({pathname:"/date/"+dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]})
    }
    function next(){
        viewDate.setDate(viewDate.getDate()+1)
        dateSplit = [viewDate.getFullYear(), (viewDate.getMonth()+1), viewDate.getDate()];
        setRedirect({pathname:"/date/"+dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]})
    }

    return (
        <div className="mt-4 padx-20">
            <section className="d-flex justify-content-center align-items-center">
                
                <button className="btn-sm btn-primary" onClick={previous}>Previous</button>

                <h1 className="text-center mx-5"> {dateSplit.join("-")} </h1>

                <button className="btn-sm btn-primary" onClick={next}>Next</button>
            </section>
            { viewDate.valueOf()>=dateToday.valueOf()?
            <div className="d-flex flex-column align-items-center mt-4">
                <button className="btn btn-primary" onClick={()=>setRedirect({path:"/date/"+params.date+"/create-event"})}>Create Event</button>
            </div>:null}
            <h3 className="mt-3 mb-3">Events</h3>
            <div style={{width:"100%", height:"1px", backgroundColor:"black"}}/>
            <div>
                {eventList.map((x,i)=>{
                    let startDate = new Date(x.startDate.split("-")[0]+"-"+x.startDate.split("-")[1]+"-"+x.startDate.split("-")[2]);
                    let endDate = new Date(x.endDate.split("-")[0]+"-"+x.endDate.split("-")[1]+"-"+x.endDate.split("-")[2]);
                    startDate.setHours(0,0,0,0);
                    endDate.setHours(0,0,0,0);
                    if(viewDate.valueOf() >= startDate.valueOf() && viewDate.valueOf() <= endDate.valueOf()) {
                        return <div className="card my-2 text-center marx-20 py-2" key={i} 
                        onClick={() => setRedirect({pathname:"/event", state:{eventPos:i}})}>{x.title}</div>
                    }
                    return null;
                })}
            </div>
            <div>
                <div className="row justify-content-center align-items-center mt-5"><strong>This date in history:</strong></div>
                <div className="row justify-content-center align-items-center">{dateFact}</div>
            </div>
        </div>
    );
}
