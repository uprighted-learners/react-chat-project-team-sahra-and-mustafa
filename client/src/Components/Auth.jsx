//! Import Area
import React from 'react'
import "./Css_files/Auth.css"
import {useState} from "react"
//!Auth Component
const Auth = (props) => {
    // signup state for tenary operator form switch
    const [isSignUp, setIsSignUp] = useState(true)
    // signup form input states
    const [firstName, setFirstName] = useState(" ")
    const [lastName, setLastName] = useState(" ")
    const [email, setEmail] = useState(" ")
    const [password, setPassword] = useState(" ")
        // error msg State
    const [errMsg, setErrMsg] = useState(" ")
    console.log(props.updateToken);

    //! helper function to handle sign up form input for server recognition
    const handleSignUp = async () => {
        try {
            setErrMsg(" ")
            //? fetch call for local host to server
            const result = await fetch( "http://localhost:3001/users/create", {
                //post endpoint call with json body matching keys: for form input validation
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                })
            })
            

            const json = await result.json()
            console.log(json);
            props.updateToken(json.Token)

            if(json.Error){
                throw new Error(json.Error)
            }
        } catch (err) {
            setErrMsg(err.message);
        }
    }

  return (
    
    <div className='form_container'>
          <form className=' form_border' onSubmit={(e) => {
            e.preventDefault()
            handleSignUp()
          }} >
            <div className='signup_text'>
              <h4>{ isSignUp ?  "SignUp" : "LogIn"} Form {errMsg}</h4>
            </div>
         
          
          <input className='firstName' value={firstName} placeholder='FirstName' onChange={(e) => setFirstName(e.target.value)} required />
          
          <input className='lastName' value={lastName} placeholder='LastName' onChange={(e) => setLastName(e.target.value)} required/>
          
          <input className='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
          
          <input className='password' value={password} placeholder='Password' minLength={5} maxLength={12} onChange={(e)=> setPassword(e.target.value)} required/>
          

          <button className='signup_btn'>
              SignUp
            </button>

         </form>
        
            <button onClick={() => setIsSignUp((prev) => !prev)}>LogIn</button>
           
          </div>
  )
}

export default Auth