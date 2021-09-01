import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  Navbar,
  Container,
  Nav,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import { FaSearch } from "react-icons/fa";

function Header({ setCoordinates }) {

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className='pt-2 pb-2'>
          <Navbar.Brand href="#home">Travel Advisory</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Item>
              <InputGroup >
                <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
                <FormControl
                  onLoad={onLoad} 
                  onPlaceChanged={onPlaceChanged}
                  placeholder="Explore New Places"
                  aria-label="Explore New Places"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
