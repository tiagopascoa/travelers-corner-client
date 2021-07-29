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
    const { username, email, imageUrl, myPosts, following, id } = this.state;
    
    
    return loggedUser ? (
      <Container fluid>
        <Row className="user-row1 mt-3 ms-2 me-2">
          <Col md={4} className="user-area-cols user-area-col1">
            <h3 className="mx-auto mt-3">Hello {username}!</h3>
            <div className="mx-auto mb-3">
              <img
                className="img-user-profile mt-3"
                src={imageUrl}
                alt="User profile"
              />
            </div>
          </Col>
          <Col md={4} className="user-area-cols user-area-col2">
            <h3 className="mx-auto mt-3">Contact information</h3>
            <h5 className="mt-3">Username: {username}</h5>
            <h5>Email: {email}</h5>
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
        <Row className="user-row2 ms-2 me-2">
          <Col md={8} className="user-area-cols2 user-area-col-map">
            <div className="user-following-posts mt-5 mb-5">
              <div>
                <i className="fas fa-map-marked-alt navbar-brand"></i>
                <NavLink to={`/user-area/${id}/map`}>Create Your Travels Pin Map!</NavLink>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="user-row3 ms-2 me-2">
          <Col md={8} className="user-area-cols2 user-area-col3">
            <div className="user-following-posts mt-3 mb-3">
              <div>
                <h5>
                  <i class="fas fa-clone me-2"></i>My Posts
                </h5>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="user-row4 ms-2 me-2">
          <Col md={8} className="user-area-col-lists">
            {myPosts.map((post) => {
              return (
                <ul className="list-following-posts">
                  <li key={post._id}>
                  <img src={post.imageUrl} alt="" style={{ width: "3rem", height: "3rem", borderRadius: "50%"}} className="me-2"/>
                  <NavLink to={`/travel-posts/${post._id}`}>{post.city}</NavLink></li>
                </ul>
              );
            })}
          </Col>
        </Row>
        <Row className="user-row5 ms-2 me-2">
          <Col md={8} className="user-area-cols2 user-area-col3">
            <div className="user-following-posts mt-3 mb-3">
              <div>
                <h5>
                  <i class="fas fa-clone me-2"></i>Following
                </h5>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="user-row6 ms-2 me-2 mb-3">
          <Col md={8} className="user-area-col-lists">
            {following.map((follower) => {
              return (
                <ul className="list-following-posts">
                  <li key={follower._id}>
                   <img src={follower.imageUrl} alt="" style={{ width: "3rem", height: "3rem", borderRadius: "50%"}} className="me-2"/>
                   <NavLink to={`/user-profile/${follower._id}`}>{follower.username}</NavLink></li>
                </ul>
              );
            })}
          </Col>
        </Row>
      </Container>
    ) : (
      <></>
    );
  }
}

export default UserArea;
