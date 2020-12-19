import React from "react";
import Input from "./Input";
import Output from "./Output";
import { SocketProvider } from "./socket";

function App() {
  return (
    <div>
      <SocketProvider>
        <Input />
        <Output />
      </SocketProvider>
    </div>
  );
}

export default App;
