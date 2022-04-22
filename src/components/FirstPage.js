import React, {useLayoutEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const FirstPage = ({ history, loggedInUser }) => {

  useLayoutEffect(() => {
    if (loggedInUser) {
      history.push("/main");
    }
  }, [loggedInUser, history]);

  return (
    <Container fluid>
      <Row className="firstPage-row pt-5">
        <Col md={5}>
          <img
            className="firstPage-img"
            src="/images/final-cover-img.svg"
            alt=""
          />
        </Col>
        <Col md={5} className="firstPage-secondCol">
          <div className="front-text-container">
            <h1 className="page-title">Welcome to the TRAVELERS CORNER!</h1>
            <p>
              Share your travels with the community, get inspired by others and
              experiment the cool built in features.
            </p>
            <p>Get ready to start your journey!</p>
          </div>
          <div className="firstPage-btns-container">
            <div className="my-btn">
              <NavLink to="/login">Login</NavLink>
            </div>
            <div className="my-btn">
              <NavLink to="/signup">Signup</NavLink>
            </div>
          </div>
          <div className="firstPage-features-container">
            <div className="firstPage-features-div1">
              <div className="features-img-container">
                <img src="/images/gallery.svg" alt="" />
              </div>
              <h6>Share photos and travel highlights</h6>
            </div>
            <div className="firstPage-features-div3">
              <div className="features-img-container">
                <img src="/images/follower1.svg" alt="" />
              </div>
              <h6>Follow other travelers</h6>
            </div>
            <div className="firstPage-features-div4">
              <div className="features-img-container">
                <img src="/images/weather.svg" alt="" />
              </div>
              <h6>Wheater forecasts at destinations</h6>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
