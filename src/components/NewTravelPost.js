import React, { useRef, useState } from "react";
import { newTravelPost, uploadFile } from "../api";
import { Container, Col, Form, Button, Row } from "react-bootstrap";

export const NewTravelPost = ({ history, user }) => {
  const titleRef = useRef();
  const locationRef = useRef();
  const descriptionRef = useRef();
  const tagsRef = useRef();
  const [image, setImage] = useState();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("image", image);

    const response = await uploadFile(uploadData);

    const tagsArr = tagsRef.current.value.split(",");

    const newPost = {
      title: titleRef.current.value,
      location: locationRef.current.value,
      description: descriptionRef.current.value,
      tags: tagsArr,
      imageUrl: response.data.fileUrl,
    };
    await newTravelPost(newPost);
    history.push("/main");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <div className="new-post-container">
            <Form onSubmit={handleSubmitForm} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Traveling in Portugal . . ."
                  ref={titleRef}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Lisbon, Portugal . . ."
                  ref={locationRef}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  placeholder="lisbon,summer,friends (separeted by commas)"
                  ref={tagsRef}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  ref={descriptionRef}
                  as="textarea"
                  rows={2}
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Photo/Video</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </Form.Group>

              <Button type="submit">New Post</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

