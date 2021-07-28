import React from "react";
import { getTravelPost } from "../api";
import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NewComment from "./NewComment";

class TravelPostPage extends React.Component {
  state = {
    city: "",
    description: "",
    tags: [],
    user: {},
    imageUrl: "",
    createdAt: "",
    comments: [],
  };

  async componentDidMount() {
    const response = await getTravelPost(this.props.match.params.id);
    this.setState({
      city: response.data.city,
      description: response.data.description,
      tags: response.data.tags,
      user: response.data.user,
      imageUrl: response.data.imageUrl,
      createdAt: response.data.createdAt,
      comments: response.data.comments,
    });
  }

  addComment = (newComment) => {
    this.setState({
      comments: this.state.comments.concat(newComment),
    });
  };

  render() {
    const { city, description, tags, user, imageUrl, createdAt, comments } =
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
            <h2 className="mx-auto mt-3">{city}</h2>

            <h5>
              {tags.map((tag) => {
                return `#${tag} `;
              })}
            </h5>

            <p className="">{description}</p>

            <div className="">
              <h6>Created by:</h6>
              <p>
                <NavLink to={`/user-profile/${user._id}`}>
                  {user.username}
                </NavLink>
              </p>
            </div>
            <div className="mb-4">
              {" "}
              <h6>Date:</h6>
              {createdAt.slice(0, 10)}
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={8} className="mx-auto travelPost-page-col3">
            <div className="post-page-comments mt-3 mb-3">
              <h5>
                <i className="far fa-comments me-1"></i>Comments
              </h5>
            </div>
            <NewComment
              user={this.props.user}
              postId={this.props.match.params.id}
              addComment={this.addComment}
            />

            {comments.map((comment) => {
              return (
                <div className="comments-super-conatiner">
                <div className="comments-container">
                  <div>
                    <h6>
                      <NavLink to={`/user-profile/${user._id}`}>
                        {comment.user}
                      </NavLink>
                    </h6>
                  </div>
                  <div>
                    <p className="comment-p">{comment.comment}</p>
                  </div>
                </div>
                </div>
                
              );
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default TravelPostPage;
