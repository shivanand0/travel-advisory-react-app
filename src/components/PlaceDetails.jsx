import React from "react";
import { CardGroup, Card, Badge, Button, Row, Col } from "react-bootstrap";
import { FaMoneyBill, FaAddressCard, FaPhoneAlt } from "react-icons/fa";
import { AiTwotoneStar, AiFillStar } from "react-icons/ai";
function PlaceDetails({ place, selected, refProp }) {

  if(selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <CardGroup>
      <Card>
      {place.is_closed? <Badge bg="danger">Closed</Badge>: <Badge bg="success">Open</Badge> }
      
        <Card.Img
          variant="top"
          src={
            place.photo
              ? place.photo.images.large.url
              : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          }
          // style={{ height: "200px" }}
        />
        <Card.Body className="p-2">
          <Card.Title>{place.name}</Card.Title>
          {Number(place.rating)} <AiFillStar style={{ color: '#f5cb42' }} /> Out of {place.num_reviews} Reviews
          <Card.Text>
            <FaMoneyBill /> Price:{" "}
            {place.price ? place.price : "Details not available"}
            <br></br>
            <AiTwotoneStar /> Ranking :{" "}
            {place.ranking ? place.ranking : "Details not available"}
            <br></br>
            <FaAddressCard /> Address:{" "}
            {place.address ? place.address : "Details not available"}
            <br></br>
            <FaPhoneAlt />{" "}
            <a href="tel: {place.phone}" style={{ color: "#000" }}>
              {place.phone ? place.phone : "not available"}
            </a>
            <br></br>
            <br></br>
            {place?.cuisine?.map(({ name }) => (
              <Badge pill bg="dark" text="light">
                {name}
              </Badge>
            ))}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {place.distance_string
              ? place.distance_string + " from your location"
              : "distance not available"}{" "}
          </small>
          <br></br>
          <Row className='mt-3'>
          {place.web_url?
            <Col md={6} xs={6}>
              <Button variant="outline-dark" size="sm" onClick={() => window.open(place.web_url, '_blank')}>
                Trip Advisor
              </Button>
            </Col>
            : ''}
            {place.website?
            <Col md={6} xs={6}>
              <Button variant="outline-dark" size="sm" onClick={() => window.open(place.website, '_blank')}>
                Website
              </Button>
            </Col>
            :''}
          </Row>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default PlaceDetails;
