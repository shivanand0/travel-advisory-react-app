import React, { useState, useEffect, createRef } from "react";
import { Container, Form, FloatingLabel, Row, Col } from "react-bootstrap";

import PlaceDetails from './PlaceDetails';

function List({ places, childClicked, rating, setRating, type, setType }) {
  

  // console.log({childClicked});
  /*
  //to scroll to a pecific element on our list when we click on map for that we'll use react ref
  const [elRefs, setElRefs] = useState([]); //this will contain all the refrences, & once we get places we'll set that to state
  useEffect(() => {
    const refs  = Array(places.length).fill().map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]); //we'll recall this useEffect everytime places change
  */
  return (
    <div>
      <Container fluid>
        <h4>Restaurants, Hotels {"&"} Attractions around you</h4>
        
          <Row>
            <Col xs={6} md={6}>
              <FloatingLabel controlId="floatingSelect" label="Type">
                <Form.Select
                  aria-label="Default select example"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="restaurants">Restaurants</option>
                  <option value="hotels">Hotels</option>
                  <option value="attractions">Attractions</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={6} md={6}>
              <FloatingLabel controlId="floatingSelect" label="Rating">
                <Form.Select
                  aria-label="Default select example"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value={0}>All</option>
                  <option value={3}>Above 3.0</option>
                  <option value={4}>Above 4.0</option>
                  <option value={4.5}>Above 4.5</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
      </Container>
      <Container style={{ height: '75vh', overflow: 'auto' }}>
          {
              places?.map((place, i) => (
                  <Row key={i} xs={12} className='pt-3'>
                    <PlaceDetails 
                      place={place}
                      selected={Number(childClicked) === i}
                    />
                  </Row>
              ))
          }
      </Container>
    </div>
  );
}

export default List;
