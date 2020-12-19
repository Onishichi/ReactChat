import React from "react";

function Log ( props )
{
    const user = props.user;
    const text = props.text;
    return (
        <p>
            <span>{ user }</span>
            <span>{ text}</span>
        </p>
    )
}

export default Log;
