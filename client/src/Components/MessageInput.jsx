import React, { useState } from 'react';

//MessageInput Component - Handles user input for sending new messafes

const MessageInput = ({onSendMessage}) =>{

    //state variables will manage form inputs
    const [when, setWhen] = useState('')
    const [user, setUSer] = useState('')
    const [body, setBody] = useState('')
}

// next add function to handle the form submission
//const handleSubmit 