import React, { useState, useContext } from "react";
import { SocketContext } from "./socket";

function Input() {
  const [text, setText] = useState("");
  const socket = useContext(SocketContext);

  //textbox更新時に呼ばれる
  const handleChange = (event) => {
    setText(event.target.value);
  };

  //submit時に呼ばれる
  const handleSubmit = (event) => {
    event.preventDefault();

    if (text === "") {
      return;
    }

    socket.emit("message", { text: text });
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={text} />
      </form>
    </div>
  );
}

export default Input;
