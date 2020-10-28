import React, { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';

export default function CreateEvent() {

    const [formData, setFormData] = useState({
        title:'', description:'',
        fromYear:'', fromMonth:'', fromDay:'', fromHour:'', fromMinute:'',
        toYear:'', toMonth:'', toDay:'', toHour:'', toMinute:''});
    const [hidden, setHidden] = useState(true);

    const selectFromHourRef = useRef();
    const selectFromMinuteRef = useRef();
    const selectToHourRef = useRef();
    const selectToMinuteRef = useRef();

    useEffect(()=>{
        // change date values to the date we navigated from
        let date = new Date();
        let dateMinute = Math.ceil(date.getMinutes()/5)*5;
        let dateHour = date.getHours();
        dateHour = dateMinute===60?dateHour+1:dateHour
        dateMinute = dateMinute===60?0:dateMinute;

        setFormData(
        {
            title:'', description:'',
            fromYear:date.getFullYear(), fromMonth:date.getMonth()+1, fromDay:date.getDate(), fromHour:dateHour, fromMinute:dateMinute,
            toYear:date.getFullYear(), toMonth:date.getMonth()+1, toDay:date.getDate(), toHour:dateHour, toMinute:dateMinute
        });
        },[]);

    // change to previous date adress
    if(formData.done) { return <Redirect push to={{pathname:"/"}} />; }

    async function saveEvent(e) {
        e.preventDefault();

        let currentDate = new Date();
        let fromDate = new Date(formData.fromYear, formData.fromMonth-1, formData.fromDay, formData.fromHour, formData.fromMinute);
        let toDate = new Date(formData.toYear, formData.toMonth-1, formData.toDay, formData.toHour, formData.toMinute);
        let lastDate = new Date(fromDate);
        lastDate.setDate(fromDate.getDate()+7);

        // if startdate is equal to todays date
        if(fromDate.getFullYear()===currentDate.getFullYear() &&
        fromDate.getMonth()===currentDate.getMonth() &&
        fromDate.getDate()===currentDate.getDate())
        {
            // if fromHour is before now
            if(fromDate.getHours() < currentDate.getHours()) {
                selectFromHourRef.current.setCustomValidity("Event cannot start in the past!");
                selectFromHourRef.current.reportValidity();
                return false;
            }
            // if fromHour is now and fromMinute is before now
            if(fromDate.getHours() === currentDate.getHours() && fromDate.getMinutes() < currentDate.getMinutes()) {
                selectFromMinuteRef.current.setCustomValidity("Event cannot start in the past!");
                selectFromMinuteRef.current.reportValidity();
                return false;
            }
        }

        // if enddate is equal to final possible date
        if(toDate.getFullYear()===lastDate.getFullYear() &&
        toDate.getMonth()===lastDate.getMonth() &&
        toDate.getDate()===lastDate.getDate())
        {
            // if toHour is after fromhour
            if(toDate.getHours() > fromDate.getHours()) {
                selectToHourRef.current.setCustomValidity("Event limit is 7 days!");
                selectToHourRef.current.reportValidity();
                return false;
            }
            // if toHour is now and if toMinute is after fromMinute
            if(toDate.getHours() === currentDate.getHours() && toDate.getMinutes() > fromDate.getMinutes()) {
                selectToMinuteRef.current.setCustomValidity("Event limit is 7 days!");
                selectToMinuteRef.current.reportValidity();
                return false;
            }
        }

        // if enddate is equal to startdate
        if(toDate.getFullYear() === fromDate.getFullYear() &&
        toDate.getMonth() === fromDate.getMonth() &&
        toDate.getDate() === fromDate.getDate()) {
            // if toHour is before fromHour
            if(toDate.getHours() < fromDate.getHours()) {
                selectToHourRef.current.setCustomValidity("Event cannot end before it starts!");
                selectToHourRef.current.reportValidity();
                return false;
            }
            // if toHour is fromHour and toMinute is before fromMinute
            if(toDate.getHours() === fromDate.getHours() && toDate.getMinutes() < fromDate.getMinutes()) {
                selectToMinuteRef.current.setCustomValidity("Event cannot end before it starts!");
                selectToMinuteRef.current.reportValidity();
                return false;
            }
            // if the event is less than 15 minutes long
            if(toDate.valueOf() < new Date(fromDate.getTime() + 15 *60000).valueOf()) {
                selectToMinuteRef.current.setCustomValidity("Event cannot be less than 15 minutes!");
                selectToMinuteRef.current.reportValidity();
                return false;
            }
        } 

        let eventObject = {
            title:formData.title,
            description:formData.description,
            from:formData.fromYear+'-'+formData.fromMonth+'-'+formData.fromDay+'?'+formData.fromHour+':'+formData.fromMinute,
            to:formData.toYear+'-'+formData.toMonth+'-'+formData.toDay+'?'+formData.toHour+':'+formData.toMinute
        }

        /* disabled for testing
        await(await fetch('/api/event', {
            method:'POST',
            body:JSON.stringify(eventObject),
            headers:{
                'Content-Type':'application/json'
            }
        })).json();
        */
        console.log(eventObject);

        setFormData({done:true});

        return true;
    }

    function selectEndDate(e) {
        let splitDate = e.currentTarget.value.split('-')
        setFormData({
            ...formData,
            toYear:parseInt(splitDate[0]),
            toMonth:parseInt(splitDate[1]),
            toDay:parseInt(splitDate[2])
        });

        hideModal(e);
    }

    const hideModal = (e) => { if(e.target===e.currentTarget) setHidden(true); }
    const showModal = () => setHidden(false);

    const cancel = () => setFormData({done:"yes"});

    const handleInputChange = e => { setFormData({
        ...formData,
        [e.currentTarget.name]:e.currentTarget.value
    });
        selectFromHourRef.current.setCustomValidity('');
        selectFromMinuteRef.current.setCustomValidity('');
        selectToHourRef.current.setCustomValidity('');
        selectToMinuteRef.current.setCustomValidity('');
    };

    return (
        <div className="row pt-4 justify-content-center">
            <div hidden={hidden} className="col mod-date h-100 w-100">
                <div className="row h-100 justify-content-center align-items-center" onClick={hideModal}>
                    <div className="col-7 mod-date-content">
                        <h4 className="row text-light unselectable" >Select End Date</h4>
                        <div className="row h-100 justify-content-center align-items-center">
                            {[...Array(8).keys()].map(num => {
                                let fromDate = new Date(formData.fromYear+'-'+(formData.fromMonth)+'-'+formData.fromDay);
                                let toDate = new Date(fromDate);
                                toDate.setDate(fromDate.getDate()+num);
                                return <button className="btn btn-light col text-center unselectable mx-1" key={num} value={(toDate.getFullYear()+'-'+(toDate.getMonth()+1)+'-'+toDate.getDate()).toString()} onClick={selectEndDate}>
                                    {toDate.getFullYear()+'-'+(toDate.getMonth()+1)+'-'+toDate.getDate()}</button>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <form className="col-6" onSubmit={saveEvent}>
                <h3 className="mb-4">Create Event</h3>
                <div className="form-group">
                    <label className="w-100"><strong>Title:</strong>
                        <input className="form-control" name="title" type="text" onChange={handleInputChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label className="w-100"><strong>Description (optional):</strong>
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
                                <select className="form-control" ref={selectFromHourRef} name="fromHour" value={formData.fromHour} onChange={handleInputChange}>
                                    {[...Array(24).keys()].map(num => {
                                        let number = num.toString().length===1?'0'+num:num;
                                        return <option key={number} value={num}>{number}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col padl-0">Minute
                                <select className="form-control" ref={selectFromMinuteRef} name="fromMinute" value={formData.fromMinute} onChange={handleInputChange}>
                                    {[...Array(12).keys()].map(num => {
                                        let number = (num*5).toString().length===1?'0'+(num*5):(num*5);
                                        return <option key={number} value={num*5}>{number}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="form-group"><strong>To:</strong>
                    <label className="w-100">
                        <div className="row">
                            <div className="col padr-0">Year<input className="form-control text-center" name="toYear" type="number" value={formData.toYear} disabled /></div>
                            <div className="col padx-0">Month<input className="form-control text-center" name="toMonth" type="number" value={formData.toMonth} disabled /></div>
                            <div className="col padl-0">Day<input className="form-control text-center" name="toDay" type="number" value={formData.toDay} disabled /></div>
                            <div className="col padr-0">Hour
                                <select className="form-control" ref={selectToHourRef} name="toHour" value={formData.toHour} onChange={handleInputChange}>
                                    {[...Array(24).keys()].map(num => {
                                        let number = num.toString().length===1?'0'+num:num;
                                        return <option key={number} value={num}>{number}</option>  
                                    })}
                                </select>
                            </div>
                            <div className="col padl-0">Minute
                                <select className="form-control" ref={selectToMinuteRef} name="toMinute" value={formData.toMinute} onChange={handleInputChange}>
                                    {[...Array(12).keys()].map(num => {
                                        let number = (num*5).toString().length===1?'0'+(num*5):(num*5);
                                        return <option key={number} value={num*5}>{number}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="float-right">
                    <button className="btn btn-primary" type="button" onClick={showModal}>Select End Date</button>
                    <button className="btn btn-primary ml-2" type="submit">Save</button>
                </div>
                <div className="float-left">
                    <button className="btn btn-danger" type="button" onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}