import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function CreateEvent() {

    const [formData, setFormData] = useState({});

    useEffect(()=>{
        console.log("create event mounted")
        // change date values to the date we navigated from
        let date = new Date();
        let yearNow = date.getFullYear().toString();
        let monthNow = (date.getMonth()+1).toString();
        let dayNow = date.getDate().toString();
        let hourNow = date.getHours().toString();
        let minuteNow = date.getMinutes().toString();

        setFormData({title:'', description:'',
                    fromYear:yearNow, fromMonth:monthNow, fromDay:dayNow, fromHour:hourNow, fromMinute:Math.ceil(minuteNow/5)*5,
                    toYear:yearNow, toMonth:monthNow, toDay:dayNow, toHour:hourNow, toMinute:Math.ceil(minuteNow/5)*5});
    },[])

    if(formData.title===undefined) return null;

    // change to previous date adress
    if(formData.error || formData.done) return <Redirect to='/' />

    async function saveEvent(e) {
        e.preventDefault();

        let eventObject = {
            title:formData.title,
            description:formData.description,
            from:formData.fromYear+'-'+formData.fromMonth+'-'+formData.fromDay+'-'+formData.fromHour+'-'+formData.fromMinute,
            to:formData.toYear+'-'+formData.toMonth+'-'+formData.toDay+'-'+formData.toHour+'-'+formData.toMinute
        }

        /* disabled for testing
        let result = await(await fetch('/api/event', {
            method:'POST',
            body:JSON.stringify(eventObject),
            headers:{
                'Content-Type':'application/json'
            }
        })).json();

        console.log(result);
        */
        console.log(eventObject);

        setFormData({done:true});
    }

    /*
    function selectEndDate() {
        // might not use this
    }
    */

    const cancel = () => setFormData({done:true});

    const handleInputChange = e => setFormData({
        ...formData,
        [e.currentTarget.name]:e.currentTarget.value
    });
    
    return (
        <div className="row justify-content-center">
            <form className="col-6" onSubmit={saveEvent}>
                <h3 className="my-4">Create Event</h3>
                <div className="form-group">
                    <label className="w-100"><strong>Title:</strong>
                        <input className="form-control" name="title" type="text" onChange={handleInputChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label className="w-100"><strong>Description:</strong>
                        <textarea className="form-control" name="description" rows="6" type="text" onChange={handleInputChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label className="w-100"><strong>From:</strong>
                        <div className="row">
                            <div className="col padr-0">Year<input className="form-control text-center" name="fromYear" type="number" value={formData.fromYear} disabled /></div>
                            <div className="col padx-0">Month<input className="form-control text-center" name="fromMonth" type="number" value={formData.fromMonth} disabled /></div>
                            <div className="col padl-0">Day<input className="form-control text-center" name="fromDay" type="number" value={formData.fromDay} disabled /></div>
                            <div className="col padr-0">Hour
                                <select className="form-control" name="fromHour" defaultValue={formData.fromHour} onChange={handleInputChange}>
                                    {[...Array(24).keys()].map(num => {
                                        let number = num.toString().length===1?'0'+num:num;
                                        return <option key={number} value={number}>{number}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col padl-0">Minute
                                <select className="form-control" name="fromMinute" defaultValue={formData.fromMinute} onChange={handleInputChange}>
                                    {[...Array(12).keys()].map(num => {
                                        let number = (num*5).toString().length===1?'0'+(num*5):(num*5);
                                        return <option key={number} value={number}>{number}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="form-group"><strong>To:</strong>
                    <label className="w-100">
                        <div className="row">
                            <div className="col padr-0">Year<input className="form-control text-center" name="toYear" type="number" value={formData.fromYear} disabled /></div>
                            <div className="col padx-0">Month<input className="form-control text-center" name="toMonth" type="number" value={formData.fromMonth} disabled /></div>
                            <div className="col padl-0">Day<input className="form-control text-center" name="toDay" type="number" value={formData.fromDay} disabled /></div>
                            <div className="col padr-0">Hour
                                <select className="form-control" name="toHour" defaultValue={formData.toHour} onChange={handleInputChange}>
                                    {[...Array(24).keys()].map(num => {
                                        let number = num.toString().length===1?'0'+num:num;
                                        return <option key={number} value={number}>{number}</option>  
                                    })}
                                </select>
                            </div>
                            <div className="col padl-0">Minute
                                <select className="form-control" name="toMinute" defaultValue={formData.toMinute} onChange={handleInputChange}>
                                    {[...Array(12).keys()].map(num => {
                                        let number = (num*5).toString().length===1?'0'+(num*5):(num*5);
                                        return <option key={number} value={number}>{number}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="float-right">
                    <button className="btn btn-primary" type="button">Select End Date</button>
                    <button className="btn btn-primary ml-2" type="submit">Save</button>
                </div>
                <div className="float-left">
                    <button className="btn btn-danger" type="button" onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}