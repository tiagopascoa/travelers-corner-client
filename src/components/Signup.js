import React from "react";
import { signup, uploadFile } from "../api";
import { toast } from "react-toastify";
import { Container, Col, Row, Form, Button} from 'react-bootstrap';


class Signup extends React.Component {
    state = {
      username: "",
      password: "",
      email: "",
      imageUrl: ""
    };

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
    
    handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const uploadData = new FormData();
        uploadData.append("image", this.state.imageUrl);
        const response = await uploadFile(uploadData);

        const newUser = {
          imageUrl: response.data.fileUrl,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        };

        await signup(newUser);

        toast.success("Sign up successful");
        this.props.history.push("/login");
      } catch (e) {
        toast.error("Not possible to signup");
      }
    };

    handleChangeFile = (event) => {
      this.setState({
        imageUrl: event.target.files[0],
      });
    };

    render() {
      const { username, password, email } = this.state;
      return (
        <Container fluid>
            <Row>
              <Col md={4} className="mx-auto">
                <h2 className="d-flex justify-content-center my-2">Signup</h2>
                <Form onSubmit={this.handleFormSubmit}>

                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" onChange={this.handleChange} value={username}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={this.handleChange} value={email}/>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={this.handleChange} value={password}/>
                  </Form.Group>

                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Profile picture</Form.Label>
                    <Form.Control type="file" name="image" onChange={this.handleChangeFile}/>
                  </Form.Group>

                  <Button  type="submit">Signup</Button>
                </Form>
              </Col>
            </Row>
        </Container>
         
      );
    }
  }
  export default Signup;