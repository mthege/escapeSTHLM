import React from 'react';
import {Button, Col, Row, Card, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchRoom.css';
import StarRating from './StarRating';

export function SearchRoom({data, user}){

     return(

     <> 
 <div className="container-searchroom">
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
                </div>))}
                </div>
</>

);
};

export default SearchRoom;





