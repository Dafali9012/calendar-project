import React from 'react';

export default function CreateEvent() {

    return (
        <>
            <div className="row">
                <div className="col-12"><h3>Create Event</h3></div>
                <div className="col-6">
                    <form>
                        <div className="form-group">
                            <label className="w-100">Title
                                <input className="form-control" name="title" type="text"/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="w-100">Description
                                <textarea className="form-control" name="description" type="text"/>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}