import React, { useEffect, useState, useContext } from "react";
import Log from "./Log"
import { SocketContext } from "./socket";

function Output() {
  const [logArr, setLogArr] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(
      "message",
      ( { user, text, date } ) =>
      {
        const objArr = [
          ...logArr,
          {
            user: user,
            text: text,
            key: date,
          },
        ];
        setLogArr( objArr );
        console.log( objArr );
      },
      []
    );
  } );

  const logs = logArr.map( ( log ) =>
    <Log key={ log.key } user={ log.user } text={log.text} />
    );

  return (
    <div>
      {logArr.map( ( log ) =><Log key={ log.key } user={ log.user } text={log.text} />)}
    </div>
  );
}

export default Output;
