import React from 'react';
import {Button, Col, Row, Card, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchRoom.css';

export function SearchRoom({data}){
     return(

     <> 
 
{data.map((item)=> (
<Container style={{alignContent:"center"}} key={item.id}>
    
    <Row className="justify-content-md-center">
        <Col lg={6} sm={12} >
            <Card classnMe="justify-content-md-center" style={{backgroundColor:"#808080"}} key={item.id}>

            <img variant="top" src={item.img} className="img-item" alt="item.room_name"/> 

                <Card.Body >

                    <Card.Title style={{color: "#F0F0F0"}}>{item.room_name}</Card.Title>
                       
                        <Card.Text style={{color: "#F0F0F0"}}>About the room: 
                        </Card.Text> 
                        <Card.Text style={{color: "#F0F0F0"}}>
                        {item.about}</Card.Text> 
                        <Card.Text style={{color: "#F0F0F0"}}>Cathegory: {item.theme}
                        </Card.Text>
                        
                  <Link to={`/roomcard/${item.id}`}> <Button variant="outline-light" size="md">Learn More</Button></Link>
                  <Link to="#"> <Button variant="outline-light" size="md">+ Add to My Rooms</Button></Link>

                </Card.Body>
            </Card>
        </Col>
        
    </Row>

   
</Container>

 ))}
</>

);
};

export default SearchRoom;





