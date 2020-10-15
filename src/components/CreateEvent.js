import React from 'react';

export default function CreateEvent() {

    return (
        <>
            <div className="row">
                <div className="col-12 my-4">
                    <h3>Create Event</h3>
                </div>
                <form className="w-100">
                    <div className="col-6">
                        <div className="form-group">
                            <label className="w-100">Title
                                <input className="form-control" name="title" type="text"/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="w-100">Description
                                <textarea className="form-control" name="description" rows="6" type="text"/>
                            </label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label className="w-100">From
                                <input className="form-control" name="dateFrom" type="number" maxlength="2"/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="w-100">To
                                <input className="form-control" name="dateTo" type="number"/>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}