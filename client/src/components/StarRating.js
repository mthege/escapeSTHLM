import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

import './StarRating.css'

/**
 * 
 * @param {object} props contains loged in user and selected room 
 * @returns a rating functionthat also saves the rated 
 * room the the profile page
 */
const StarRating = (props)=>{

  let user = props.user
  let room = props.room

  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
        const res = await axios.get(`http://localhost:5001/users/${user}/rooms/${room}/rating`);
        setRating(res.data.rating);
    };
    fetchData();
  }, [rating, room, user]);

 
  const handleSubmit = async (ratingValue) => {
    try {
      const response = await axios.post(`http://localhost:5001/users/${user}/rooms/${room}/rating`,
          JSON.stringify({ rating: ratingValue }),
          {
              headers: { 'Content-Type': 'application/json' }
          }
      );
      setRating(ratingValue)
  } catch (err) {
      if (!err?.response) {
          console.log('No Server Response');
      } else if (err.response?.status === 401) {
          console.log('Username Taken');
      } else {
          console.log('Failed to rate ' + err?.response?.status)
      }
  }
  }
  
// const [hover, setHover] = useState(null);
return(

<div> {[...Array (5)].map((star, i) =>{
  const ratingValue = i+1;

  return ( 
    <label key={ratingValue}>
    <input type="radio" name="rating" value={ratingValue} 
      onClick={()=> handleSubmit(ratingValue)}
      disabled={user===undefined}
        // onMouseOver={() => setHover(ratingValue)} 
        // onMouseOut={() =>setHover(null)}
    />

    <FontAwesomeIcon 
      className="star" 
      icon={faStar}
      color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}  
    />
  </label>
  )
 })}

{/* <p>Rating is {rating}</p> */}

</div>
  )
}

export default StarRating;