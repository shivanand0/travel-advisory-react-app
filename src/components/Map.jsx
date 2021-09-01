import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
//*react-device-detect dosen't detects size when user resizes the page
import { isMobile } from "react-device-detect";
import { Card } from 'react-bootstrap';

function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked }) {
  // const coordinates = { lat: 0, lng: 0};
  
  return (
    <div style={{ height: "85vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDWLuwA5c3qI4tjgn0Xb76-LCbXsoqEWoY" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          // console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        //get info about which child clicked from the map compo all the way to our list compo - create child state for this
        //lifting state up method: 
        //take this state to the parent compo of both the list & the map i.r App compo
        onClick={(child) => setChildClicked(child)}
      >
        {/* googleMapReact makes it simple to show pins on map
                 we just need to render them inside the block*/}
        {places?.map((place, i) => (
          <div
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {isMobile ? (
              <FaMapMarkerAlt style={{ fontSize: "30px", color: "red" }} />
            ) : (
              <Card style={{ width: "8rem", height: 'auto' }}>
                <Card.Img variant="top"
                    src={
                        place.photo
                          ? place.photo.images.large.url
                          : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      }
                      alt={place.name}
                      style={{ height: "100px", cursor: 'pointer' }}
                />
                <Card.Body>
                  <Card.Title>{place.name}</Card.Title>
                  {Number(place.rating)} <AiFillStar style={{ color: '#f5cb42' }} />
                </Card.Body>
              </Card>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
