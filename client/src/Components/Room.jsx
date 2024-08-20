import React, {useEffect, useState } from 'react';
// Import MessageInput component
// Import MessageDisplay component
import MessageInput from './MessageInput'; 
import MessageDisplay from './MessageDisplay'; 

// Room component manages the chat room, fetching, displaying, and sending messages
const Room = ({ match }) => {
    const { roomId } = match.params; // Extract roomId from the route parameters
    const [messages, setMessages] = useState([]); // State to store messages
  
    // Fetch messages when the component mounts or roomId changes
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:3001/message/display/${roomId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('myToken')}`, // Authorization header with JWT token
            },
          });

          //parse JSON response and update messages state with the fetched messages
          const data = await response.json(); 
          setMessages(data.Results); 
          
          // log erros
        } catch (err) {
          console.error('Failed to fetch messages:', err); 
        }
      };

      //callback when component mounts or roomid changes
      //dependency array [roomId] will ensure it runs when roomId changes
      fetchMessages(); 
    }, [roomId]); 
  
    // Function to handle sending a new message
    //POST Method specified, content-type, and Authorization header with JWT token

    const handleSendMessage = async (message) => {
      try {
        const response = await fetch(`http://localhost:3001/message/create`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${localStorage.getItem('myToken')}`, 
          },
          body: JSON.stringify({
            when: message.when,
            user: message.user,
            room: roomId, 
            body: message.body,
          }),
        });

        // parse JSON response and update messages state with new message
        const json = await response.json(); 
        setMessages([...messages, json]); 
      } catch (err) {
        console.error('Failed to send message:', err); 
      }
    };
  
    return (

      <div className="room-container">
        <h2>Welcome to Room {roomId}</h2>
        

        {/* displays the list of messages */}
        {/* dandles sending new messages */}
        
        <MessageDisplay messages={messages} />  


        <MessageInput onSendMessage={handleSendMessage} />  
      </div>
    );
  };
  
  export default Room;