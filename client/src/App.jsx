import SignUp from './Components/SignUp'
import { useState } from 'react'

import './App.css'

function App() {
const {formState, setFormState} = useState(false)
  

 
  return (
    <>
      <main>

        < div className='flex_container'>
          <div className='header'>
            <h3>Upright Educations</h3>
            <h2>Sahra & Mustafa's</h2>
            <h3>Application</h3>
          </div>
          <div className='form_container'>
          <form className=' form_border'>
            <div className='signup_text'>
              <h4>SignUp Form</h4>
            </div>
         
          
          <input className='firstName' placeholder='FirstName' required />
          <input className='lastName' placeholder='LastName' required/>
          <input className='email' placeholder='Email' required/>
          <input className='password' placeholder='Password' minLength={5} maxLength={12} required/>
          

          <button className='signup_btn'>
              SignUp
            </button>

         </form>
        
            
           
          </div>
        </div>
      </main>
   
      
    </>
  )
}

export default App
