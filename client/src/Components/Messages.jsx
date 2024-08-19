import React from 'react'
import { useState, useEffect } from 'react'
import "./Css_files/Message.css"


const Messages = (props) => {
    const [results, setResults] = useState([])
    const [when, setWhen] = useState("")
    const [text, setText] = useState("")
    const [user, setUser] = useState("")
    const [room, setRoom] = useState("")
    const [body, setBody] = useState("")  
    
    //! displayMessages endpoint
    const displayMessages = async () => {
        //? try catch to establish message display data
        try {
            let result = await fetch("http;//localhost:3001/message/display ", {
                headers: {
                    Authorization: "Bearer" + " " + localStorage.getItem("myToken")
                }
            })
            let json = await result.json()
            console.log(json);
            setResults(json.Results)
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        displayMessages()
        console.log("It Works");
    }, [])
    
    
    
    //! createMessage endpoint   
    const createMessage = async (e) => {
        try {
            e.preventDefault()
            
         const result = await fetch("http://localhost:3001/message/create", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem("myToken")}`
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
        displayMessages()      
       } catch (err) {
        console.log(err.message);
       }

    } 
    //TODO: Create a new array from [resultts] useState results.map()!
    const viewMessages = () => {
        return results.map((message) => <div style={{border: "3em solid black", padding: "2em"}} key={post._id}>
            <h2>{message.text}</h2>
        </div>)
    }

  return (
        <>
        <div className='message_container'>

            
          <form className='form_MessageBorder' onSubmit={createMessage}>
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
          {viewMessages()}
        </div>
        </>
    )
}

export default Messages