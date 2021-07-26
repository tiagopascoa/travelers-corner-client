import React from "react";
import { getTravelPost } from "../api";
import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { NewComment } from "./NewComment";

class TravelPostPage extends React.Component {
  state = {
    location: "",
    description: "",
    tags: [],
    user: {},
    imageUrl: "",
    createdAt: "",
    comments: []
  };

  async componentDidMount() {
    const response = await getTravelPost(this.props.match.params.id);
    this.setState({
      location: response.data.location,
      description: response.data.description,
      tags: response.data.tags,
      user: response.data.user,
      imageUrl: response.data.imageUrl,
      createdAt: response.data.createdAt,
      comments: response.data.comments
    });
  }

  

  render() {
    const { location, description, tags, user, imageUrl, createdAt, comments } =
      this.state;

    /* const haveComments = comments.length > 0;  */

    return (
      <Container fluid>
        <Row className="travelPost-page-row1 mt-3">
          <Col md={4} className="travelPost-page-col1">
            <div className="mx-auto mt-3 mb-4">
              <img
                className="destination-img"
                src={imageUrl}
                alt="Destination"
              />
            </div>
          </Col>
          <Col md={4} className="travelPost-page-col2">
            <h2 className="mx-auto mt-3">{location}</h2>

            <h5>
              {tags.map((tag) => {
                return `#${tag} `;
              })}
            </h5>

            <p className="">{description}</p>

            <div className="">
              <h6>Created by:</h6>
              <NavLink to={`/user-profile/${user._id}`}>
                <p>{user.username}</p>
              </NavLink>
            </div>
            <div className="mb-4">
              {" "}
              <h6>Date:</h6>
              {createdAt.slice(0, 10)}
            </div>
          </Col>
        </Row>
        <Row>
        <Col md={8} className="mx-auto travelPost-page-col3">
            <div className="post-page-comments mt-3 mb-3">
                <h5>
                <i className="far fa-comments me-1"></i>Comments
                </h5>
            </div>
            <NewComment />
            <p>
              {comments.map((comment) => {
                return <ul>
                    <li>{comment}</li>
                </ul>
              })}
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default TravelPostPage;
