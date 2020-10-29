import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

export default function DateView(){

    useEffect(()=>{
        fetchDateFact(dateSplit)
        // eslint-disable-next-line
    },[])

    const [redirect, setRedirect] = useState({path:null});
    const [dateFact, setDateFact] = useState();
    const params = useParams();

    const fetchDateFact = async (dateSplit) =>{
        const baseURL = 'http://numbersapi.com/'
        const date = dateSplit[1].toString()+'/'+dateSplit[2].toString()
        const extension ='/date'
        const resp = await fetch(baseURL+date+extension);
        const data = await resp.text()
        setDateFact(data);
    }

    if(redirect.path!=null) return <Redirect push to={redirect.path}/>
    
    let dateToday = new Date();
    let viewDate = new Date();

    dateToday.setHours(0,0,0,0);
    viewDate.setHours(0,0,0,0);

    if(params.date) {
        viewDate = new Date(params.date);
    }
    if(isNaN(viewDate.getDate())) setRedirect({path:"/"});

    let dateSplit = [viewDate.getFullYear(), (viewDate.getMonth()+1), viewDate.getDate()];

    for(let x = 0; x < dateSplit.length; x++) {
        dateSplit[x] = dateSplit[x].toString().padStart(2, "0");
    };

    function previous(){
        viewDate.setDate(viewDate.getDate()-1)
        setRedirect({path:"/date/"+viewDate.getFullYear()+'-'+(viewDate.getMonth()+1)+'-'+viewDate.getDate()})
    }
    function next(){
        viewDate.setDate(viewDate.getDate()+1)
        setRedirect({path:"/date/"+viewDate.getFullYear()+'-'+(viewDate.getMonth()+1)+'-'+viewDate.getDate()})
    }

    return (
        <div className="mt-4">
            <section className="d-flex justify-content-center align-items-center">
                
                <button className="btn-sm btn-primary" onClick={()=>previous()}>Previous</button>

                <h1 className="text-center mx-5"> {dateSplit.join("-")} </h1>

                <button className="btn-sm btn-primary" onClick={()=>next()}>Next</button>
            </section>
            { viewDate.valueOf()>=dateToday.valueOf()?
            <div className="d-flex flex-column align-items-center mt-4">
                <button className="btn btn-primary" onClick={()=>setRedirect({path:"/date/"+params.date+"/create-event"})}>Create Event</button>
            </div>:null}
            <h3 className="mt-3 mb-3">Your Events</h3>
            <div style={{width:"100%", height:"1px", backgroundColor:"black"}}/>
            <h6 className="mt-4 ml-2">No Events</h6>
            <div>
            <div className="row justify-content-center align-items-center mt-5"><strong>This date in history:</strong></div>
        <div className="row justify-content-center align-items-center">{dateFact}</div>
            </div>
        </div>
    ) 
}