//  import { RoomCard } from "./RoomCard";

export const SearchTable = ({ data }) => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Room</th>
            <th>Location</th>
            <th>Theme</th>
          </tr>
          {data.map((item) => (
            <tr key={item.id}>
              
              <td>{item.room_name}</td>
              <td>{item.location}</td>
              <td>{item.theme}</td>
              <td> <img src={item.img} alt={item.room_name} height="200" width="auto"/>
              </td>
              <td><button className="btn">Add Room</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default SearchTable;