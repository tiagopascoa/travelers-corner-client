import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { logout } from "../api";
/* import { NavLink } from "react-router-dom"; */

function MyNavbar({ loggedInUser, setLoggedInUser }) {
  const logoutUser = async () => {
    await logout();
    setLoggedInUser(null);
  };

  return loggedInUser ? (
    <Navbar className="my-nav" collapseOnSelect expand="lg" variant="dark">
      <Container fluid>
      <i className="fas fa-map-marked-alt navbar-brand"></i>
        <Navbar.Brand href="/main">
          TRAVELERS CORNER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
{/*         <Form className="d-flex ">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}

          <Nav.Link href="/main">
            <i class="fas fa-home fa-lg"></i>
          </Nav.Link>
        </Nav>
         
          <Nav className="ms-auto">
            <Nav.Link href="/user-area">Welcome {loggedInUser.username}</Nav.Link>
            <Nav.Link>
              <button className="logout-btn" onClick={logoutUser}>
                Logout
              </button>
            </Nav.Link>
            {/* <NavLink to="/signup">Signup</NavLink> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : (
    <Navbar className="my-nav" collapseOnSelect expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <i className="fas fa-map-marked-alt navbar-brand"></i>TRAVELERS CORNER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Signup">Signup</Nav.Link>
            {/* <NavLink to="/signup">Signup</NavLink> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
