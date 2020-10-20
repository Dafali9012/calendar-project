import React, { useEffect } from "react";
export default function Calendar() {

    useEffect(()=>{
        console.log("calendar mounted");
    },[])

    return (
        <div className="card col-lg-4">Hej       Hej</div>
    );
}