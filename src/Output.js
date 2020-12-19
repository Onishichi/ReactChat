import React, { useEffect, useState, useContext } from "react";
import Log from "./Log"
import { SocketContext } from "./socket";

const MAX_LOG_ARR_LENGTH = 10;

function Output() {
  const [logArr, setLogArr] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(
      "message",
      ( { user, text, date } ) =>
      {
        let newLogArr = [    
          {
            user: user,
            text: text,
            key: date,
          },
          ...logArr,
        ];
        if ( newLogArr.length > MAX_LOG_ARR_LENGTH )
        {
          newLogArr.pop();
        }
        setLogArr( newLogArr );
      }
    );
    return () =>
    {
      socket.off( "message" );
    }
  });

  return (
    <div>
      {logArr.map( ( log ) =><Log key={ log.key } user={ log.user } text={log.text} />)}
    </div>
  );
}

export default Output;
