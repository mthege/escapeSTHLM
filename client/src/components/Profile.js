import React, {useContext, useEffect, useState} from 'react';
import {SessionContext, setSessionCookie} from "./UserSession";
import {Button, Col, Row, Card, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import StarRating from './StarRating';
import axios from 'axios';
import './Profile.css';

export function Profile(){
    const session = useContext(SessionContext);
    var user = session.user;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`http://localhost:5000/savedrooms?user=${user}`);
            setData(res.data);
        };
        fetchData();
    }, [user]);

    console.log("DATA: " + JSON.stringify(data))

    return(

        <div className="container-profile">
            <div className="item-profile">
                <div className="profile-title">{session.user}´s saved and rated rooms </div>
              
                {data.map((item)=> (
                <div className="card-container">
                    <img variant="top" src={item.img} className="img-item" alt="item.room_name"/> 
                    <div className="card-container-text">
                        <div className="card-title">{item.room_name}</div>
                        <div className="card-text">{item.about}</div>
                        <div className="card-cath">{item.theme}</div>
                        <Link to={`/roomcard/${item.id}`}> <button variant="outline-light" size="md">Learn More</button></Link>
                        <Link to="#"> <button variant="outline-light" size="md">+ Add to My Rooms</button></Link>
                        <StarRating room={item.id} user={user} />
                    </div>
                </div>
                ))}
            </div>
        </div>

    )
}