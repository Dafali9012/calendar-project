import React from 'react';

export default function Event() {

    return (
        <div className="row">
            <div className="pt-4 col-12 d-flex flex-column" style={{padding: "0 20% 0 20%"}}>
                <h3 className="text-center" style={{textDecoration:"underline"}}>EVENT-TITLE</h3>
                <h4 className="text-center">STARTDATE - ENDDATE</h4>
                <h4 className="mt-4">Description</h4>
                <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</p>
            </div>
            <div className="col" style={{padding: "0 20% 0 20%"}}>
                <button className="float-right btn-sm btn-primary">Attend Event</button>
            </div>
            <div className="col-12 d-flex flex-column mt-4" style={{padding: "0 15% 0 15%"}}>
                <h4>Attendees</h4>
                <div className="row">
                    <p className="col-4 mar-0">Attendee Number One <span className="text-muted" style={{fontSize:".75em"}}>#12345</span></p>
                    <p className="col-4 mar-0">Attendee Number Two <span className="text-muted" style={{fontSize:".75em"}}>#12345</span></p>
                    <p className="col-4 mar-0">Attendee Number Three <span className="text-muted" style={{fontSize:".75em"}}>#12345</span></p>
                    <p className="col-4 mar-0">Attendee Number Four <span className="text-muted" style={{fontSize:".75em"}}>#12345</span></p>
                    <p className="col-4 mar-0">Attendee Number Five <span className="text-muted" style={{fontSize:".75em"}}>#12345</span></p>
                    <p className="col-4 mar-0">Attendee Number Six <span className="text-muted" style={{fontSize:".75em"}}>#12345</span></p>
                    <p className="col-4 mar-0">Attendee Number Seven <span className="text-muted" style={{fontSize:".75em"}}>#12345</span></p>
                    <p className="col-4 mar-0">Attendee Number Eight <span className="text-muted" style={{fontSize:".75em"}}>#12345</span></p>
                </div>
            </div>
        </div>
        
    );
}