import React from "react";
import { getTravelPost, newComment } from "../api";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import '../App.css';

class NewComment extends React.Component {
  state = {
    travelpost_id:'',
    comment: "",
    user: "",
  };

  async componentDidMount (){
    const travelID = this.props.postId;
    const response = await getTravelPost(travelID);

    this.setState({
      travelpost_id: response.data._id,
      user: this.props.user,
    })
    console.log("id:", this.state.travelpost_id)
    console.log("user:", this.state.user)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    
    console.log("adding a comment")

    const { user, comment, travelpost_id} = this.state;

    const newCommentUpdate = {
      comment,
      user: user.username
    };

    console.log(newCommentUpdate)

    await newComment(travelpost_id, newCommentUpdate);
    this.props.addComment(newCommentUpdate);

    /* this.props.history.push('/main');  */
  }

/*   hadleOnClick = () => {
    this.setState({comment: ""});
  } */


  render() {
    const { comment } = this.state;
    return (
      <Container fluid>
        <Row className="comments-col">
          <Col md={8} >
              <Form onSubmit={this.handleFormSubmit} >
                <Form.Group className="mb-3 mx-auto" controlId="formBasicLocation">
                  <Form.Control
                    type="text"
                    name="comment"
                    onChange={this.handleChange}
                    value={comment}
                  />
                </Form.Group>   
                <Button onClick={this.hadleOnClick} type="submit">New comment!</Button>
              </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

  
export default NewComment
  
