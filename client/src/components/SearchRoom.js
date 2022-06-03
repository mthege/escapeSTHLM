import React from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchRoom.css';
import StarRating from './StarRating';
/**
 * @param {string} data a list of all room
 * @param {string} user loged in user
 * @returns Renders a page with searchable rooms. 
 * Rooms are displayed in a list and with component SearchInput makes it 
 * possitble to filter the search resluts  
 */
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
                        <StarRating room={item.id} user={user} />
                        <p style={{size: "2rem"}}>You have to be logged in to rate a room</p>
                    </div>
                </div>))}
                </div>
</>

);
};

export default SearchRoom;





