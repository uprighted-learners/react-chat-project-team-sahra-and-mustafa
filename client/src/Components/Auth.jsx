import React from 'react'
import "./Css_files/Auth.css"
import {useState} from "react"

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true)



  return (
    
    <div className='form_container'>
          <form className=' form_border'>
            <div className='signup_text'>
              <h4>{ isSignUp ?  "SignUp" : "LogIn"} Form</h4>
            </div>
         
          
          <input className='firstName' placeholder='FirstName' required />
          <input className='lastName' placeholder='LastName' required/>
          <input className='email' placeholder='Email' required/>
          <input className='password' placeholder='Password' minLength={5} maxLength={12} required/>
          

          <button className='signup_btn'>
              SignUp
            </button>

         </form>
        
            <button onClick={() => setIsSignUp((prev) => !prev)}>LogIn</button>
           
          </div>
  )
}

export default Auth