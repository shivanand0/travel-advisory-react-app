import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { getPlacesData } from "./api";

function App() {
  const [places, setPlaces] = useState([]);
  
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});

  // bounds -> top right & bottom left corners
  const [bounds, setBounds] = useState({});

  // const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  //set the coordinates to be the users coordinates at start of the application

  useEffect(() => {
    //get geolocation of user using built-in browser geolocation api
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
        setCoordinates({ lat: latitude, lng: longitude });
    })
  }, [])

  //for rating
  useEffect(() => {
    //if rating is larger than currently selected rating then return that places
    const filterPlaces = places.filter((place) => place.rating > rating)

    setFilteredPlaces(filteredPlaces);

  }, [rating]);

  //using useEffect we'll call getPlacesData funtion inside of functional app component
  useEffect(() => {
    //   console.log(coordinates, bounds);
    //our getPlacesData is an asynchronous function means we have to call .then
    //get real info on map based on that call only the right restaurants for that map
    //for that we have to pass some info to getPlacesData function so more useState fields
    if(bounds.sw && bounds.ne)
    {
      getPlacesData(type, bounds.sw, bounds.ne)
          .then((data) => {
              // console.log(data);
              setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
              setFilteredPlaces([]);
          })
    }
  }, [type, coordinates, bounds]);
  //dependency array at the end of the function is important
  //by leaving this array empty > code inside of this functional block will happen only at start of the application
  //& we have to call getPlacesData only once at the start of the application
  //if we want to reran the code as the map changes we have to give coordinates & bounds in dependency array
  //getPlaces data retuns something that is restaurants data so we've to set that data to state

  return (
    <>
      <Header setCoordinates={setCoordinates} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} className="pt-4">
            <List 
              places={filteredPlaces.length ? filteredPlaces : places} 
              childClicked={childClicked}  
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Col>
          <Col xs={12} md={9} className="pt-4">
            <Map 
                setChildClicked={setChildClicked}
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces.length ? filteredPlaces : places}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
