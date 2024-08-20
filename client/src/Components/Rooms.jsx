//import necessary modules from React and Router DOM
import React, { useEffect, useState } from "react";

// Rooms Component to display a list of available chatrooms
const Rooms = ({ setSelectedRoom }) => {
  // state variable will hold the list of rooms fetched from the backend
  const [rooms, setRooms] = useState([]);

  //useEffect hook used to run components
  useEffect(() => {
    //Function to fetch the lost of rooms from Api

    const fetchRooms = async () => {
      try {
        // Sending a Get request to backend to fetch rooms
        const response = await fetch("http://localhost:3001/rooms/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          },
        });
        const data = await response.json();
        //update the state with fetch rooms data
        setRooms(data.rooms);
        console.log(data);
        //catch to log any errors that occur during the fetching request
      } catch (err) {
        console.log("Failed to fetch rooms:", err);
      }
    };
    fetchRooms();
  }, []);
  //Render the component's UI
  return (
    <div className="rooms-container">
      {/*header for the list of available rooms here */}
      <ul>
        {rooms.map((room) => (
          // Map over the rooms array to create list item for each room
          <li key={room._id}>
            {/* using Link component is used to navigate to specific room's chat page */}
            <button onClick={() => setSelectedRoom(room)}>{room.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
