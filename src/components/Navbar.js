import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { logout } from "../api";
/* import { NavLink } from "react-router-dom";  */

function MyNavbar({ loggedInUser, setLoggedInUser }) {
  const logoutUser = async () => {
    await logout();
    setLoggedInUser(null);
  };


  return loggedInUser ? (
    <Navbar className="my-nav" collapseOnSelect expand="lg" variant="dark">
      <Container fluid>
      <Navbar.Brand href="/main">
        <img src="/images/world-map.svg" className="logo" alt="" />
        </Navbar.Brand>
        <Navbar.Brand href="/main">
        
          TRAVELERS CORNER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

        <Nav className="ms-auto">
          <Nav.Link href="/main">
            <i className="fas fa-home fa-lg"></i>
          </Nav.Link>
        </Nav>
         
          <Nav className="ms-auto">
            
            <img src={loggedInUser.imageUrl} alt="" className="navbar-user-img"/>
            <Nav.Link href={`/user-area/${loggedInUser._id}`}>Welcome {loggedInUser.username}</Nav.Link>
            <Nav.Link href="/">
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
