import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function CreateEvent() {

    const [formData, setFormData] = useState({})
    
    useEffect(()=>{
        console.log("create event mounted")
        // change date values to the date we navigated from
        setFormData({title:'', description:'',
                    fromYear:'2020', fromMonth:'10', fromDay:'20', fromHour:'19', fromMinute:'0',
                    toYear:'2020', toMonth:'10', toDay:'20', toHour:'19', toMinute:'10'})
    },[])

    if(formData.title===undefined) return null;

    async function createEvent(e) {
        e.preventDefault();
        // build event object and post to database
        
    }

    /*
    function selectEndDate() {
        // might not use this
    }
    */

    // change to previous date adress
    const cancel = () => { return <Redirect to='/'/> }

    const handleInputChange = e => setFormData({
        ...formData,
        [e.currentTarget.name]:e.currentTarget.value
    })
    
    return (
        <div className="row justify-content-center">
            <form className="col-6" onSubmit={createEvent}>
                <h3 className="my-4">Create Event</h3>
                <div className="form-group">
                    <label className="w-100"><strong>Title:</strong>
                        <input className="form-control" name="title" type="text" onChange={handleInputChange} />
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
                                    {[...Array(24).keys()].map(num => 
                                        <option key={num+1} value={num+1}>{num+1}</option>    
                                    )}
                                </select>
                            </div>
                            <div className="col padl-0">Minute
                                <select className="form-control" name="fromMinute" defaultValue={formData.fromMinute} onChange={handleInputChange}>
                                    {[...Array(12).keys()].map(num =>
                                        <option key={(num)*5} value={(num)*5}>{(num)*5}</option>
                                    )}
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
                                    {[...Array(24).keys()].map(num => 
                                        <option key={num+1}>{num+1}</option>    
                                    )}
                                </select>
                            </div>
                            <div className="col padl-0">Minute
                                <select className="form-control" name="toMinute" defaultValue={formData.toMinute} onChange={handleInputChange}>
                                    {[...Array(12).keys()].map(num =>
                                        <option key={(num)*5} value={(num)*5}>{(num)*5}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="float-right">
                    <button className="btn btn-primary" type="button">Select End Date</button>
                    <button className="btn btn-primary ml-2" type="submit">Create</button>
                </div>
                <div className="float-left">
                    <button className="btn btn-danger" type="button" onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}