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
        <h4>Message Form</h4>

        <input
          type="date"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          placeholder="xx/xx/xxxx"
        />
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="User"
          required
        />

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
