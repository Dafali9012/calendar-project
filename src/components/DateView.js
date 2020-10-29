import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

export default function DateView(){

    /*
    let mainDate = new Date();
    let nextDate = new Date();
    let previousDate = new Date();
    let dd = String(mainDate.getDate()).padStart(2, '0');
    let mm = String(mainDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = mainDate.getFullYear();
    let nextDateDate = String(mainDate.getDate() + 1).padStart(2, '0');
    let previousDateDate = String(mainDate.getDate() -1).padStart(2, '0');
    
    mainDate = yyyy + '-' + dd + '-' + mm;
    nextDate = yyyy + '-' + nextDateDate + '-' + mm;
    previousDate = yyyy + '-' + previousDateDate + '-' + mm;
    */
    useEffect(()=>{
        fetchDateFact(dateSplit)
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

    /*
    //Replace nextDate(date) to mainDate(date)
    function editmainDateFromPreviousDate(){
        mainDate = previousDateDate;
        return mainDate;
    }
    */

    return (
        <div className="mt-4">
            <section className="d-flex justify-content-center align-items-center">
                {/* Knappen finns endast som test så länge datumen inte är klickbara */}
                
                <button className="btn-sm btn-primary">Previous</button>

                {/*<h5 className="col-2 side-date"> {} </h5>*/}
                <h1 className="text-center mx-5"> {dateSplit.join("-")} </h1>
                {/*<h5 className="col-2 side-date"> {} </h5>*/}

                {/* Knappen finns endast som test så länge datumen inte är klickbara */}
                <button className="btn-sm btn-primary">Next</button>
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