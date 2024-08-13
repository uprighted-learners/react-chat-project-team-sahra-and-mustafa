import Auth from './Components/Auth'
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
          <Auth/>
        </div>
      </main>
   
      
    </>
  )
}

export default App
