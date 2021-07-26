import React from "react";
import { getUserProfile } from "../api";
import { Container, Col, Button, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class UserProfile extends React.Component {
  state = {
    id: "",
    username: "",
    email: "",
    imageUrl: "",
   
  };

  async componentDidMount() {
    const response = await getUserProfile(this.props.match.params.userId);
    console.log(response);
    this.setState({
      id: response.data._id,
      username: response.data.username,
      email: response.data.email,
      imageUrl: response.data.imageUrl,
      
    });
  }

  render() {
    const { username, email, imageUrl} = this.state;
    return (
      <Container fluid>
        <Row className="user-row1 mt-3">
          <Col md={4} className="user-area-cols user-area-col1">
            <h3 className="mx-auto mt-3">{username}</h3>
            <div className="mx-auto mb-5">
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
              <div className="my-btn mb-5">
                <NavLink to="#">Follow</NavLink>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="user-row3">
          <Col md={8} className="user-area-cols2 user-area-col3">
            <div className="user-following-posts mt-5 mb-3">
              <div>
                <h5>
                  <i class="fas fa-users me-2"></i>Following
                </h5>
              </div>
              <div>
                <h5>
                  <i class="fas fa-clone me-2"></i>Posts
                </h5>
              </div>
            </div>
          </Col>
        </Row>

        <div>
          
        </div>
      </Container>
      
    );
  }
}
export default UserProfile;
