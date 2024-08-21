import React from "react";
import "./Css_files/Message.css";

// Message display component reenders list of message in the chat room

const MessageDisplay = ({ messages }) => {
  return (
    <div>
      <ul key={""} className="message-list">
        {messages &&
          messages.map((msg) => (
            //unique message ID as the key for each list item

            <li key={msg._id}>
              {/*display the user's name and message body  */}
              <strong>{msg.user}</strong>: {msg.body}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MessageDisplay;
