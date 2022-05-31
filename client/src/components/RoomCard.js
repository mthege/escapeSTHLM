import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {Col, Row, Card, Container, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './RoomCard.css';


export function RoomCard(){

    const [data, setData] = useState([]);
    let id = useParams().id;

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`http://localhost:5000/rooms/${id}`);
            setData(res.data);
        };
        fetchData();
    }, [id]);


    console.log("data " + data.id);



    // let item = data.find(item => true);
    //item = data;
    let img = `http://localhost:3000/${data.img}`;

     return (
       
        <>  
      <Container style={{alignContent:"center"}} key={data.id}>
    
    <Row lg={1}className="justify-content-md-center">
        <Col lg={4} >
            <Card  style={{backgroundColor:"#808080"}} key={data.id}>

            <img variant="top" className="img-item" src={img}/>

                <Card.Body >

                    <Card.Title style={{color: "#F0F0F0"}}>{data.room_name}</Card.Title>
                       
                        <Card.Text style={{color: "#F0F0F0"}}>About the room : 
                        {data.about}</Card.Text> 
                        <Card.Text style={{color: "#F0F0F0"}}>Cathegory: {data.theme}
                        </Card.Text>
                  <Link to="/add"> <Button variant="outline-light" size="md">Back to search results</Button></Link>

                </Card.Body>
            </Card>
        </Col>
        
    </Row>

   
</Container>
{/*         
        <Container>
            <Row>
                <Col lg={12}>
                    <Card key={data.id}>
                        <Card.Body>
                            <Card.Title>{data.room_name}</Card.Title>
                            <Card.Text>{data.theme}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        
           
        </Container>
         */}
        </>
    );
};

export default RoomCard;