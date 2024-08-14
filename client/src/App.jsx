//! Import Area
import Auth from './Components/Auth'
import { useState, useEffect } from 'react'

import './App.css'

//! App function
function App() {
const [personalToken, setPersonalToken] = useState("")
  
//! useEffect for storing token in local storage
useEffect(() => {
  let token = localStorage.getItem("goldenToken")
  if(token) {
    setPersonalToken(token)
  }
}, [])

 //! token callback update
 const updateToken = (token) => {
  console.log("Token has been Updated!");
  localStorage.setItem("goldenToken", token)
  setPersonalToken(token)

 }

  //! Remove Token callback
  const removeToken = () =>{
    console.log("Token removed");
    setPersonalToken("")
    localStorage.clear()
  }
  return (
    <><header>

        {/* Header/Title of Project*/}
        < div className='flex_container'>
          <div className='header'>
            <h3>Upright Educations</h3>
            <h2>Sahra & Mustafa's</h2>
            <h3>Application</h3>
          </div>
        </div>
    </header>

      <main>
        {/* Log Out tenary operator & button onclick event */}
          {  !personalToken ? <Auth updateToken={updateToken}/> :   <button style={{position: "absolute", top: 0, right: 0, margin: "1em"}} onClick={() =>  removeToken()}>Logout</button>
          }

                
      </main>
   
      
    </>
  )
}

export default App
