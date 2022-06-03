import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {Col, Row, Card, Container, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './RoomCard.css';

/**
 * 
 * @returns the component that returns a page for the linked card 
 * of the rooms in the search results
 */
export function RoomCard(){

    const [data, setData] = useState([]);
    let id = useParams().id;

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`http://localhost:5001/rooms/${id}`);
            setData(res.data);
        };
        fetchData();
    }, [id]);

    console.log("data " + data.id);

    let img = `http://localhost:3000/${data.img}`;

     return (
       
        <>  
      <Container style={{alignContent:"center"}, {backgroundColor: "#cbc8c8"}} key={data.id}>
    
    <Row style={{padding: "20px"}}  lg={1} className="justify-content-md-center">
        <Col lg={4}>
            <Card  style={{backgroundColor:"#808080"}} key={data.id}>

            <img variant="top" className="img-item" alt="room" src={img}/>

                <Card.Body >

                    <Card.Title style={{color: "#F0F0F0"}}>{data.room_name}</Card.Title>
                       
                        <Card.Text style={{color: "#F0F0F0"}}>About the room : 
                        {data.about}</Card.Text> 
                        <Card.Text style={{color: "#F0F0F0"}}>Cathegory: {data.theme}
                        </Card.Text>
                        
                  <Link to="/searchinput"> <Button variant="outline-light" size="md">Back to search results</Button></Link>

                </Card.Body>
            </Card>
        </Col>
        
    </Row>

   
</Container>

        </>
    );
};

export default RoomCard;