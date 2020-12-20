import React, { useEffect, useState, createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext({});

export const SocketProvider = ( children ) => {
	const [socket] = useState(() => io.connect("localhost:8010"));

	useEffect(() => {
		return () => {
			socket.close();
		};
	});

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
