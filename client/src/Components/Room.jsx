import React, { useEffect, useState } from "react";
// Import MessageInput component
// Import MessageDisplay component
import MessageInput from "./MessageInput";
import MessageDisplay from "./MessageDisplay";

// Room component manages the chat room, fetching, displaying, and sending messages
const Room = ({ selectedRoom }) => {
  const [messages, setMessages] = useState([]); // State to store messages

  // Fetch messages when the component mounts or roomId changes
  const fetchMessages = async () => {
    try {
      // to clear the messages before fetching new one
      setMessages([]);
      const response = await fetch(
        `http://localhost:3001/message/display/${selectedRoom._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("myToken")}`, // Authorization header with JWT token
          },
        }
      );

      //parse JSON response and update messages state with the fetched messages
      const data = await response.json();
      setMessages(data.messages);

      // log erros
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };
  useEffect(() => {
    //callback when component mounts or roomid changes
    //dependency array [roomId] will ensure it runs when roomId changes
    fetchMessages();
  }, []);

  // Function to handle sending a new message
  //POST Method specified, content-type, and Authorization header with JWT token

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch(`http://localhost:3001/message/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
        body: JSON.stringify({
          when: message.when,
          room: selectedRoom._id,
          body: message.body,
        }),
      });

      // parse JSON response and update messages state with new message
      const json = await response.json();
      console.log(json);

      await fetchMessages();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="room-container">
      <h2>Welcome to Room {selectedRoom._id}</h2>

      {/* displays the list of messages */}
      {/* dandles sending new messages */}

      <MessageDisplay messages={messages} />

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Room;
