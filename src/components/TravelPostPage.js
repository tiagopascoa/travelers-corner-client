import React from "react";
import { getTravelPost } from "../api";
import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NewComment from "./NewComment";
import Weather from "./Weather";

class TravelPostPage extends React.Component {
  state = {
    city: "",
    country: "",
    description: "",
    tags: [],
    user: {},
    imageUrl: "",
    createdAt: "",
    comments: [],
    lat: "",
    long: "",
  };

  async componentDidMount() {
    const response = await getTravelPost(this.props.match.params.id);
    this.setState({
      city: response.data.city,
      country: response.data.country,
      description: response.data.description,
      tags: response.data.tags,
      user: response.data.user,
      imageUrl: response.data.imageUrl,
      createdAt: response.data.createdAt,
      comments: response.data.comments,
    });
    this.getCoordinates();
  }

  addComment = (newComment) => {
    this.setState({
      comments: this.state.comments.concat(newComment),
    });
  };

  getCoordinates = () => {
    const google = window.google;
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode( { address: `${this.state.city}, ${this.state.country}`}, (results, status) => {
      if (status === 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        console.log(lat, lng)
        this.setState({
            lat : lat,
            long: lng
        })
      } console.log('lat and long', this.state.lat , this.state.long)
    })
  }

  render() {
    const { city, description, tags, user, imageUrl, createdAt, comments, country } =
      this.state;

    return (
      <Container fluid>

        <Row className="travelPost-page-row1 mt-3 ms-2 me-2">
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
            <h2 className="mx-auto mt-3">{city}, {country}</h2>

            <h6>
              {tags.map((tag) => {
                return `#${tag} `;
              })}
            </h6>
            
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
              <h6>Date:</h6>
              {createdAt.slice(0, 10)}
            </div>
          </Col>
        </Row>
        <Row className="ms-2 me-2">
          <Col md={8} className="mx-auto travelPost-page-col3">
            <Weather lat={this.state.lat} long={this.state.long} location={this.state.city} />
          </Col>
        </Row>
        <Row className="mb-3 ms-2 me-2">
          <Col md={8} className="mx-auto travelPost-page-col4">
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
                    <h6 key={comment._id}>
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
