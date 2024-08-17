import React from 'react'
import { useState } from 'react'
import "./Css_files/Message.css"


const Messages = (props) => {
    const [when, setWhen] = useState("")
    const [text, setText] = useState("")
    const [user, setUser] = useState("")
    const [room, setRoom] = useState("")
    const [body, setBody] = useState("")  
    
    const createMessage = async (e) => {
        try {
            e.preventDefault()
            
         const result = await fetch("http://localhost:3001/message/create", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem("")}`
            },
            body: JSON.stringify({
                when: when,
                user: user, 
                room: room,
                body: body,
            })
        })
        const json = await result.json()

        console.log(json);
        props.updataToken(json.Token)       
       } catch (err) {
        console.log(err.message);
       }

    } 

  return (
        <>
        <div className='message_container'>

            
          <form className='form_MessageBorder' onSubmit={() => {
              
            createMessage()
            }}>
              <h4>Message Form</h4>

            <input type='date' value={when} onChange={(e) => setWhen(e.target.value)} placeholder='xx/xx/xxxx' />
            <input type='text' value={user} onChange={(e) => setUser(e.target.value)} placeholder='User' required />
            <input type='text' value={room} onChange={(e) => setRoom(e.target.value)} placeholder='Room' required />
            <input type='text' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Text' required/>
            <div>
                <button type='submit' className='message_submit'>
                    Submit
                </button>
            </div>
          </form>
        </div>
        </>
    )
}

export default Messages