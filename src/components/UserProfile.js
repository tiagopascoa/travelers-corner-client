import React, { useState, useEffect } from "react";
import { Container, Col, Card, Row } from "react-bootstrap";
/* import { NavLink } from "react-router-dom"; */

export const UserProfile = ({ user }) => {
  

 return user ? (
<Container fluid>
    <Row className="user-row1">
        <Col md={4}>
        <h1>Hello {user.username}</h1>
        <div>
            <img className="img-user-profile" src={user.imageUrl} alt="" />
        </div>
        </Col>
        <Col md={4}>
        <h1>Hello {user.username}</h1>
        <div>
            <img className="img-user-profile" src={user.imageUrl} alt="" />
        </div>
        </Col>
    </Row>
    <Row className="user-row2">
        <Col md={8}>
            <div>Following</div>
            <div>Posts</div>
        </Col>
    </Row>
</Container>

 ) : (<></>) 
};