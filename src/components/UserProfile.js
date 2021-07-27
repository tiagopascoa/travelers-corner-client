import React from "react";
import { getUserProfile, newFollower } from "../api";
import { Container, Col, Button, Row, Form } from "react-bootstrap";

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

   handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await getUserProfile(this.props.match.params.userId);
    await newFollower(response.data._id)
  } 

  render() {
    const { username, email, imageUrl } = this.state;
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
            <div className="mx-auto mb-3">
              <Form onSubmit={this.handleFormSubmit}>
                <Button type="submit"> Follow </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <Row className="user-row3">
          <Col md={8} className="user-profile-postsCol">
            <div className="user-following-posts mt-3 mb-3">
              <div>
                <h5>
                  <i className="fas fa-clone me-2"></i>Posts
                </h5>
              </div>
            </div>
          </Col>
        </Row>

        <div></div>
      </Container>
    );
  }
}
export default UserProfile;
