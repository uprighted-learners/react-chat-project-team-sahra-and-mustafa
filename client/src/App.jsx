//! Import Area
import { useState, useEffect } from "react";
import Auth from "./Components/Auth";
import Rooms from "./Components/Rooms";
import Room from "./Components/Room";

import "./App.css";

//! App function
function App() {
  const [personalToken, setPersonalToken] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  //! useEffect for storing token in local storage
  useEffect(() => {
    let token = localStorage.getItem("myToken");
    if (token) {
      setPersonalToken(token);
    }
  }, []);

  //! token callback update
  const updateToken = (token) => {
    console.log("Token has been Updated!");
    localStorage.setItem("myToken", token);
    setPersonalToken(token);
  };

  //! Remove Token callback
  const removeToken = () => {
    setSelectedRoom("");
    console.log("Token removed");
    setPersonalToken("");
    localStorage.clear();
  };

  return (
    <>
      <header>
        {/* Header/Title of Project*/}
        <div className="flex_container">
          <div className="header">
            <h3>Upright Education</h3>
            <h2>Sahra & Mustafa's</h2>
            <h3>Application</h3>
          </div>
        </div>
      </header>

      <main>
        {/* Log Out tenary operator & button onclick event
         */}
        {!personalToken ? (
          <Auth updateToken={updateToken} />
        ) : (
          <>
            <button
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "1em",
                backgroundColor: "orangered",
              }}
              onClick={() => removeToken()}
            >
              Logout
            </button>
            <Rooms setSelectedRoom={setSelectedRoom} />
            {selectedRoom ? (
              <Room selectedRoom={selectedRoom} />
            ) : (
              <h3>Please select a room</h3>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
