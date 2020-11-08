import React, { useContext, useEffect, useState } from 'react';
import { EventListContext, InviteContext, UserContext } from '../Store';

export default function FetchUser(props) {

    // eslint-disable-next-line
    const [user, setUser] = useContext(UserContext);
    // eslint-disable-next-line
    const [inviteList, setInviteList] = useContext(InviteContext);
    // eslint-disable-next-line
    const [eventList, setEventList] = useContext(EventListContext);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        fetchUser();
        setIsMounted(true);
        // eslint-disable-next-line
    },[])

    async function fetchUser() {
        let result = await (
            await fetch("/api/login", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            })
        ).json();

        if (!result.error) {
            setUser(result);
            updateEvents(result.id);
        }
    }
    
    async function updateEvents(id) {
        let result = await(await fetch("/api/event/user/"+id)).json();
        if(!result.error) {
        setEventList(result.events);
        setInviteList(result.invites);
        }
    }

    if(isMounted) {
        if(user!==null) {
            props.redirectCallBack()
        } else {

        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100 padb-10">
            <h1 className="mb-0 text-center">Loading User</h1>
        </div>
    );
}