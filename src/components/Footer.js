import React from "react";
import { Navbar, Container,} from 'react-bootstrap';

function MyFooter() {


  return (
    <div className="fixed-bottom">  
    <Navbar color="dark" dark>
        <Container>
            <Navbar.Brand>Footer</Navbar.Brand>
        </Container>
    </Navbar>
</div>
  )
}

export default MyFooter