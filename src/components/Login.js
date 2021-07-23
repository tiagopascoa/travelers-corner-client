import React from "react";
import { login } from "../api";
import { toast } from "react-toastify";
import { Container, Col, Row, Form, Button} from 'react-bootstrap';

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(this.state);
      this.props.setLoggedInUser(user.data);
      toast.success("Login successful");
      this.props.history.push("/main");
    } catch (e) {
      toast.error("Invalid login");
    }
  };
  render() {
    const { username, password } = this.state;
    return (

        <Container fluid>
            <Row>
              <Col md={4} className="mx-auto">
                <h2 className="d-flex justify-content-center my-2">Login</h2>
                <Form onSubmit={this.handleFormSubmit}>

                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" onChange={this.handleChange} value={username}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={this.handleChange} value={password}/>
                  </Form.Group>

                  <Button type="submit">Login</Button>
                </Form>
              </Col>
            </Row>
        </Container>


    );
  }
}
export default Login;