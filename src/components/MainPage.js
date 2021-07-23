import React, { useState, useEffect } from "react";
import { getAllTravelPosts } from "../api";
import { Container, Col, Card, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

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

  function handleIncrementCounter(){

  }

  return user ? (
    <Container fluid className="background-main">
      <Row>
        <Col md={5} className="mx-auto">
          <Card className="main-cards main-card-post">
            <Card.Body className="main-new-post-simulator">
              <div className="text-simulation-img-container">
                <img src={user.imageUrl} alt="" />

                <NavLink class="text-simulation-link" to="/new-travel-post">
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
                      <p>{travelPost.user.username}</p>
                      <div className="main-card-date">
                        {travelPost.createdAt.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <i class="fas fa-map-marker-alt"></i> {travelPost.location}
                  </div>
                  <div className="main-card-description">
                    {travelPost.description}
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
                    <div className="like-and-counter">
                      <img
                        className="like-blue-img me-1"
                        src="/images/like-blue.svg"
                        alt=""
                      />
                      {travelPost.likeCount}
                    </div>
                  </Card.Text>
                  <div className="like-comment-container">
                    <div><button className="like-btn" onClick={handleIncrementCounter}><i className="far fa-thumbs-up me-1"></i>Like</button></div>
                    <div><i className="far fa-comments me-1"></i>Comment</div>
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
