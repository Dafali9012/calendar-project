import React, { useState, useContext, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {UserContext} from '../Store';

export default function DateView(){

    const params = useParams();
    // eslint-disable-next-line
    const [user, setUser] = useContext(UserContext);
    const [redirect, setRedirect] = useState({path:params.date});
    // eslint-disable-next-line
    const [events, setEvents] = useState([]);
    const [dateFact, setDateFact] = useState();

    const fetchDateFact = async () =>{
        const baseURL = 'http://numbersapi.com/';
        const date = redirect.path.split("/").pop().split("-")[1]+'/'+redirect.path.split("/").pop().split("-")[2];
        const extension ='/date';
        const resp = await fetch(baseURL+date+extension);
        const data = await resp.text();
        setDateFact(data);
    }

    useEffect(()=>{
        fetchDateFact();
        // eslint-disable-next-line
    },[redirect]);

    if(redirect.path && redirect.path.split("/").pop() !== params.date) return <Redirect push to={redirect.path}/>

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
        setRedirect({path:"/date/"+dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]})
    }
    function next(){
        viewDate.setDate(viewDate.getDate()+1)
        dateSplit = [viewDate.getFullYear(), (viewDate.getMonth()+1), viewDate.getDate()];
        setRedirect({path:"/date/"+dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]})
    }

    return (
        <div className="mt-4">
            <section className="d-flex justify-content-center align-items-center">
                
                <button className="btn-sm btn-primary" onClick={previous}>Previous</button>

                <h4 className="text-center mx-5"> {dateSplit.join("-")} </h4>

                <button className="btn-sm btn-primary" onClick={next}>Next</button>
            </section>
            { viewDate.valueOf()>=dateToday.valueOf()?
            <div className="d-flex flex-column align-items-center mt-4">
                <button className="btn btn-primary" onClick={()=>setRedirect({path:"/date/"+params.date+"/create-event"})}>Create Event</button>
            </div>:null}
            <h3 className="mt-3 mb-3">Events</h3>
            <div style={{width:"100%", height:"1px", backgroundColor:"black"}}/>
            <div>
                {events.map((x,i)=>{
                    return <div key={i} onClick={()=>setRedirect({path:"/event"})}>{x.userId} {x.eventId} {x.attending}</div>
                })}
            </div>
            <div className="container">
                <div className="row justify-content-center align-items-center mt-5 ml-1"><strong>This date in history:</strong></div>
                <div className="row justify-content-center align-items-center text-center">{dateFact}</div>
            </div>
        </div>
    );
}
