import { useEffect, useState } from 'react';
import { SearchRoom } from './SearchRoom';
import axios from 'axios';
import './Add.css'

export function Add() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`http://localhost:5000?q=${query}`);
            setData(res.data);
        };
        if (query.length === 0 || query.length > 2) fetchData();
    }, [query]);

    return ( 
      <div className = "add" >
          <div className="add-section">

        <input className = "search" placeholder = "Search Rooms" onChange = {(e) => setQuery(e.target.value.toLowerCase()) }/> 
        { 
        < SearchRoom data = { data }/>} 
            </div></div>
        );
    }

    export default Add;