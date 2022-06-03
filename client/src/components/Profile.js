import React, {useContext, useEffect, useState} from 'react';
import {SessionContext} from "./UserSession";
import {Link} from 'react-router-dom'
import StarRating from './StarRating';
import axios from 'axios';
import './Profile.css';
/**
 * 
 * @returns function that handle loged in och loged out state. 
 */
export function Profile(){

    const session = useContext(SessionContext);
    var user = session.user;

    const [data, setData] = useState([]);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`http://localhost:5001/users/${user}/rooms`);
            setData(res.data);
            setSize(res.data.length);
        };
        fetchData();
    }, [user, size]);

      const handleSubmit = async (room_id) => {
    
        try {
          console.log("Time to delete a room.. ");
          const response = await axios.delete(`http://localhost:5001/users/${user}/rooms/${room_id}`);
          console.log("Room Deleted!");
          setSize(size-1);
      } catch (err) {
          if (!err?.response) {
              console.log('No Server Response');
          } else if (err.response?.status === 401) {
              console.log('Not Loggedin');
          } else {
              console.log('Failed to delete room ' + err?.response?.status)
          }
      }
    }

    return(

        <div className="container-profile">
            <div className="item-profile">
                <div className="profile-title">{user}´s saved and rated rooms </div>
              
                {data.map((item)=> (
                <div className="card-container">
                    <img variant="top" src={item.img} className="img-item" alt="item.room_name"/> 
                    <div className="card-container-text">
                        <div className="card-title">{item.room_name}</div>
                        <div className="card-text">{item.about}</div>
                        <div className="card-cath">{item.theme}</div>
                        <Link to={`/roomcard/${item.id}`}> <button variant="outline-light" size="md">Learn More</button></Link>
                        <StarRating room={item.id} user={user} />
                        <button onClick={()=> handleSubmit(item.id)}>Delete Room</button>

                    </div>
                </div>
                ))}
            </div>
        </div>

    )
}