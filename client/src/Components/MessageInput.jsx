import React, { useState } from "react";

//MessageInput Component - Handles user input for sending new messages

const MessageInput = ({ onSendMessage }) => {
  //state variables will manage form inputs
  const [when, setWhen] = useState("");
  const [user, setUser] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage({ when, user, body });
    setWhen("");
    setUser("");
    setBody("");
  };

  return (
    <>
      <form className="form_MessageBorder" onSubmit={handleSubmit}>
        <h4 style={{ margin: "0em 4em", marginBottom: "1em" }}>
          Create Message
        </h4>

        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Text"
          required
        />

        <div>
          <button type="submit" className="message_submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default MessageInput;
