import React, { useState, useEffect } from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const UserArea = ({ user }) => {
  return user ? (
    <Container fluid>
      <Row className="user-row1 mt-3">
        <Col md={4} className="user-area-cols user-area-col1">
          <h2 className="mx-auto mt-3">Hello {user.username}!</h2>
          <div className="mx-auto">
            <img className="img-user-profile" src={user.imageUrl} alt="" />
          </div>
        </Col>
        <Col md={4} className="user-area-cols user-area-col2">
          <h4 className="mt-3">Username: {user.username}</h4>
          <h4>Email: {user.email}</h4>
          <div className="edit-profile-btns">
          <div className="my-btn">
            <NavLink to="#">Edit Profile</NavLink>
          </div>
          <div className="my-btn-delete">
            <NavLink to="#">Delete Profile</NavLink>
          </div>
          </div>
          
        </Col>
      </Row>
      <Row className="user-row2">
        <Col md={8} className="user-area-cols2 ">
          <div className="user-following-posts mt-5">
            <div>
            <i className="fas fa-map-marked-alt navbar-brand"></i>
            <NavLink to="#">Create Your Travels Pin Map!</NavLink>
                
            </div>
          </div>
        </Col>
      </Row>
      <Row className="user-row3">
        <Col md={8} className="user-area-cols2 user-area-col3">
          <div className="user-following-posts mt-5">
            <div>
              <h5><i class="fas fa-users me-2"></i>Following</h5>
            </div>
            <div>
              <h5><i class="fas fa-clone me-2"></i>My Posts</h5>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
};
