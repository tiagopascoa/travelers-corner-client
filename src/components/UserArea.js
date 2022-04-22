import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React from "react";
import { getUserPosts, userArea } from "../api";

class UserArea extends React.Component {
  state = {
    id: "",
    username: "",
    email: "",
    imageUrl: "",
    following: [],
    myPosts: [],
  };

  async componentDidMount() {
    const response = await userArea(this.props.match.params.loggedUserId);
    const userPosts = await getUserPosts(this.props.match.params.loggedUserId);

    this.setState({
      id: response.data._id,
      username: response.data.username,
      email: response.data.email,
      following: response.data.following,
      imageUrl: response.data.imageUrl,
      myPosts: userPosts.data,
    });
    console.log(this.state.following);
  }

  render() {
    const { loggedUser } = this.props;
    const { username, email, imageUrl, myPosts, following } = this.state;

    return loggedUser ? (
      <Container fluid>
        <Row className="user-row1 mt-3 ms-2 me-2">
          <Col md={3} className="user-area-cols user-area-col1">
            <div className="mx-auto mb-3">
              <img
                className="img-user-profile mt-3"
                src={imageUrl}
                alt="User profile"
              />
            </div>
          </Col>
          <Col md={3} className="user-area-cols user-area-col2">
            <h4 className="mx-auto mt-5">Contact information</h4>
            <h6 className="mt-3">Username: {username}</h6>
            <h6>Email: {email}</h6>
            <div className="edit-profile-btns mt-5 mb-5 justify-content-evenly">
              <div className="my-btn">
                <NavLink to="#">Edit Profile</NavLink>
              </div>
              <div className="my-btn-delete">
                <NavLink to="#">Delete Profile</NavLink>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="user-row3 ms-2 me-2">
          <Col md={6} className="user-area-col4">
            <div className="user-following-posts mt-3 mb-2">
              <div>
                <h6>
                  <i className="fas fa-clone me-2"></i>My Posts
                </h6>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="user-row4 ms-2 me-2">
          <Col md={6} className="user-area-col5">
            <ul className="list-following-posts">
              {myPosts.map((post) => {
                return (
                  <li key={post._id} className="user-area-list-item">
                    <img
                      src={post.imageUrl}
                      alt="City representing the post"
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "50%",
                      }}
                      className="me-2"
                    />
                    <NavLink to={`/travel-posts/${post._id}`}>
                      {post.city}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
        <Row className="user-row5 ms-2 me-2">
          <Col md={6} className="user-area-col6">
            <div className="user-following-posts mt-3 mb-2">
              <div>
                <h6>
                  <i className="fas fa-clone me-2"></i>Following
                </h6>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="user-row6 ms-2 me-2 mb-3">
          <Col md={6} className="user-area-col7">
            <ul className="list-following-posts">
              {following.map((follower) => {
                return (
                  <li key={follower._id} className="user-area-list-item">
                    <img
                      src={follower.imageUrl}
                      alt="User Profile"
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "50%",
                      }}
                      className="me-2"
                    />
                    <NavLink to={`/user-profile/${follower._id}`}>
                      {follower.username}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    ) : (
      <></>
    );
  }
}

export default UserArea;
