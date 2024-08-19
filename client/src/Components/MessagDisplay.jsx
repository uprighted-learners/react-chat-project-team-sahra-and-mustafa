import React from 'react';

// Message display component reenders list of message in the chat room
const MessageDisplay = ({ messages }) => {


    return (
        <ul className="message-list">
        {messages.map((msg)=>
        
        //unique message ID as the key for each list item
       
       <li key={msg._id}>

            {/*display the user's name and message body  */}
            <strong>{msg.user}</strong>: {msg.body}

        </li>

        )}

       </ul>

    );
};

export default MessageDisplay