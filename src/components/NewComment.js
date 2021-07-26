import React, { useRef } from "react";
import { newComment } from "../api";
import { Container, Col, Form, Button, Row } from "react-bootstrap";

export const NewComment = ({ history }) => {
  
  const commentsRef = useRef();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const newCommentUpdate = {
      comments: commentsRef.current.value,
    };
    await newComment(newCommentUpdate);
    history.push("/main");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <div>
            <Form onSubmit={handleSubmitForm}>
              <Form.Group className="mb-3" controlId="formBasicLocation">
                <Form.Control
                  type="text"
                  name="comments"
                  ref={commentsRef}
                />
              </Form.Group>   
              <Button >New comment!</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};