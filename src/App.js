import React from "react";
import Input from "./Input";
import Output from "./Output";
import { SocketProvider} from "./socket";

function App() {
	return (
		<div className="app">
			<SocketProvider>
				<Output />
				<Input />
			</SocketProvider>
		</div>
	);
}

export default App;
