import React, { useEffect, useState, useContext ,useRef} from "react";
import { useScroll } from "./useScroll";
import { SocketContext } from "./socket";

const MAX_LOG_ARR_LENGTH = 100;

function Output() {
  const [ logArr, setLogArr ] = useState( [] );
  const socket = useContext( SocketContext );
  const [ scroll, setScroll ] = useScroll();
  const outputElement = useRef( null );

  useEffect( () =>
  {
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
  } );

  useEffect( () =>
  {
    let logHeight;
    try
    {
      console.log( outputElement.current.firstChild.firstChild.clientHeight );
      logHeight = outputElement.current.firstChild.firstChild.clientHeight;
    }
    catch ( e ) {}
    if ( logHeight !== null && outputElement.current !== null && scroll.vertical > 0 )
    {
      setScroll( outputElement.current, scroll.horizontal, scroll.vertical + logHeight );
    }
  },[logArr])

  const handleScroll = (event) =>
  {
    event.preventDefault();
    setScroll(outputElement.current,event.target.scrollLeft,event.target.scrollTop); 
  }
  
  const logs = logArr.map( ( log ) =>
    <li key={ log.key }>
      <span>{ log.user }</span>
      <span>{ log.text }</span>
    </li> );

  return (
    <div className="output" onScroll={handleScroll} ref={outputElement}>
      <ul className="logs">
        { logs }
      </ul>
    </div>
  );
}

export default Output;
