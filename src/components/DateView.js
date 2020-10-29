import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

export default function DateView(){

    useEffect(()=>{
        // fetchDateFact(dateSplit)
        // eslint-disable-next-line
    },[])

    const [redirect, setRedirect] = useState({path:null});
    const params = useParams();

    if(redirect.path!=null) return <Redirect push to={redirect.path}/>
    
    let viewDate = new Date();
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
                <h3 className="mt-3 mb-3">Your Events</h3>
                <u><p style={{width:"100%"}}/></u>
                <h6 className="mt-4 ml-2">No Events</h6>
        </div>
    ) 
}