import { useEffect, useState, useContext } from 'react';
import { SearchRoom } from './SearchRoom';
import {SessionContext, setSessionCookie} from "./UserSession";
import axios from 'axios';
import './SearchInput.css'
/**
 * 
 * @returns Page and search functions for rooms.
 */
export function SearchInput() {

    const session = useContext(SessionContext);

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`http://localhost:5001/rooms?q=${query}`);
            setData(res.data);
        };
        if (query.length === 0 || query.length > 2) fetchData();
    }, [query]);

    return ( 
      <div className = "add" >
          <div className="add-section">
              <div className="add-item">
                <div className="add-text">Search location, theme or name of the room</div>
                <input className = "search" placeholder = "Search Rooms" onChange = {(e) => setQuery(e.target.value.toLowerCase()) }/> 
            </div>
        { 
        < SearchRoom data = { data } user = {session.user} />} 
            </div></div>
        );
    }

    export default SearchInput;