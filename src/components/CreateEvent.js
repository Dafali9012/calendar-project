import React from 'react';

export default function CreateEvent() {

    return (
        <div className="row justify-content-center">
            <form className="col-6">
                <h3 className="my-4">Create Event</h3>
                <div className="form-group">
                    <label className="w-100"><strong>Title:</strong>
                        <input className="form-control" name="title" type="text" />
                    </label>
                </div>
                <div className="form-group">
                    <label className="w-100"><strong>Description:</strong>
                        <textarea className="form-control" name="description" rows="6" type="text" />
                    </label>
                </div>
                <div className="form-group">
                    <label className="w-100"><strong>From:</strong>
                        <div className="row">
                            <div className="col padr-0">Year<input className="form-control" name="fromYear" type="number" disabled /></div>
                            <div className="col padx-0">Month<input className="form-control" name="fromMonth" type="number" disabled /></div>
                            <div className="col padl-0">Day<input className="form-control" name="fromDay" type="number" disabled /></div>
                            <div className="col padr-0">Hour
                                <select className="form-control" name="fromHour">
                                    {[...Array(24).keys()].map(num => 
                                        <option key={num+1} value={num+1}>{num+1}</option>    
                                    )}
                                </select>
                            </div>

                            <div className="col padl-0">Minute
                                <select className="form-control" name="fromHour">
                                    {[...Array(11).keys()].map(num =>
                                        <option key={(num+1)*5} value={(num+1)*5}>{(num+1)*5}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="form-group"><strong>To:</strong>
                    <label className="w-100">
                        <div className="row">
                            <div className="col padr-0">Year<input className="form-control" name="toYear" type="number" disabled /></div>
                            <div className="col padx-0">Month<input className="form-control" name="dateFrom" type="number" disabled /></div>
                            <div className="col padl-0">Day<input className="form-control" name="dateFrom" type="number" disabled /></div>
                            <div className="col padr-0">Hour
                                <select className="form-control" name="fromHour">
                                    {[...Array(24).keys()].map(num => 
                                        <option key={num+1}>{num+1}</option>    
                                    )}
                                </select>
                            </div>

                            <div className="col padl-0">Minute
                                <select className="form-control" name="fromHour">
                                    {[...Array(11).keys()].map(num =>
                                        <option key={(num+1)*5}>{(num+1)*5}</option>
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
                    <button className="btn btn-danger" type="button">Cancel</button>
                </div>
            </form>
        </div>
    )
}