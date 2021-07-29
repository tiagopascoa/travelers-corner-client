import React from "react";
import { getUserProfile, newFollower, getUserPosts } from "../api";
import { Container, Col, Button, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

class UserProfile extends React.Component {
  state = {
    id: "",
    username: "",
    email: "",
    imageUrl: "",
    myPosts: [],
  };

  async componentDidMount() {
    const response = await getUserProfile(this.props.match.params.userId);
    const userPosts = await getUserPosts(this.props.match.params.userId);
    console.log(userPosts);

    this.setState({
      id: response.data._id,
      username: response.data.username,
      email: response.data.email,
      imageUrl: response.data.imageUrl,
      myPosts: userPosts.data,
    });

    console.log(this.state.myPosts);
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    await newFollower(this.state.id, this.props.user._id);
    toast.success("following");
  };

  render() {
    const { username, email, imageUrl, myPosts } = this.state;
    const havePosts = myPosts.length > 0;
    return (
      <Container fluid>
        <Row className="user-row1 mt-3">
          <Col md={4} className="user-area-cols user-area-col1">
            <h3 className="mx-auto mt-3">User: {username}</h3>
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
        {havePosts && (
          <Row className="user-row3">
            <Col md={8} className="user-profile-postsCol">
              <div className="user-following-posts mt-3 mb-3">
                <div>
                  <h5>
                    <i className="fas fa-clone me-2"></i>Posts
                  </h5>
                </div>
              </div>
              <div>
                {myPosts.map((post) => {
                  return (
                    <ul className="list-following-posts">
                      <li key={post._id}>
                        <img
                          src={post.imageUrl}
                          alt=""
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
                    </ul>
                  );
                })}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default UserProfile;
