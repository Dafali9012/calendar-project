/*
import React, { useState } from 'react';

export default function Test() {
    const [date, setDate] = useState(new Date());
    const [update, setUpdate] = useState(false);

    function triggerRerender() {
        date.setDate(date.getDate()-1)
        console.log(date.toString())
        setUpdate(!update)
    }

    console.log("rendering");

    return(
        <div>
            <button onClick={triggerRerender}>Rerender</button>
            <div>{date.toString()}</div>
        </div>
    );
}
*/