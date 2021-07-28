import React, { useState, useEffect } from "react";
import { getAllTravelPosts } from "../api";
import { Container, Col, Card, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LikeButton from "./LikeButton";

export const MainPage = ({ user }) => {
  const [travelPosts, setTravelPost] = useState([]);

  useEffect(() => {
    //runs everytime the component is rendered
    async function fetchTravelPosts() {
      const response = await getAllTravelPosts();
      setTravelPost(response.data);
    }
    fetchTravelPosts();
  }, []); //<- dependency array

  return user ? (
    <Container fluid className="background-main">
      <Row>
        <Col md={5} className="mx-auto">
          <Card className="main-cards main-card-post">
            <Card.Body className="main-new-post-simulator">
              <div className="text-simulation-img-container">
                <img src={user.imageUrl} alt="" />
                <NavLink className="text-simulation-link" to="/new-travel-post">
                  <div className="text-simulation-container">
                    <div>
                      Hey {user.username}, ready to start sharing your travels?
                      ...
                    </div>
                  </div>
                </NavLink>
              </div>
            </Card.Body>
            <Card.Body className="mx-auto">
              <NavLink className="" to="/new-travel-post">
                <div>
                  <img
                    className="add-photo-img"
                    src="/images/add-photo.svg"
                    alt=""
                  />
                  Photo/Video
                </div>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {travelPosts.map((travelPost) => {
        return (
          <Row className="flex-row-reverse">
            <Col md={5} className="mx-auto flex-col-reverse">
              <Card key={travelPost._id} className="main-cards ">
                <Card.Header className="main-card-header">
                  <div className="main-card-user-info">
                    <img src={travelPost.user.imageUrl} alt="" />
                    <div>
                      <p>
                        <NavLink to={`/user-profile/${travelPost.user._id}`}>
                          {travelPost.user.username}
                        </NavLink>
                      </p>

                      <div className="main-card-date">
                        {travelPost.createdAt.slice(0, 10)}
                      </div>
                    </div>
                    <NavLink
                      className="ms-auto"
                      to={`/travel-posts/${travelPost._id}`}
                    >
                      <img
                        src="/images/plus-sign-blue.svg"
                        alt=""
                        style={{ width: "1.5rem" }}
                      />
                    </NavLink>
                  </div>
                  <div className="mt-2 mb-2">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {travelPost.city}
                  </div>
                </Card.Header>
                <Card.Img
                  className="main-card-img"
                  variant="top"
                  src={travelPost.imageUrl}
                />
                <Card.Body>
                  <Card.Text className="like-comment-counter-container">
                    <div>
                      {travelPost.tags.map((tag) => {
                        return `#${tag} `;
                      })}
                    </div>
                    <div className="like-and-counter mt-2 mb-2">
                      <LikeButton travelPostId={travelPost._id} />
                    </div>
                  </Card.Text>
                  <div className="like-comment-container">
                    <div>
                      <NavLink to={`/travel-posts/${travelPost._id}`}>
                        <i className="far fa-comments me-1"></i>Comment
                      </NavLink>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })}
    </Container>
  ) : (
    <></>
  );
};
