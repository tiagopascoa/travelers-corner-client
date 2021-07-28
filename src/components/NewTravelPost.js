import React, { useRef, useState } from "react";
import { newTravelPost, uploadFile } from "../api";
import { Container, Col, Form, Button, Row } from "react-bootstrap";

export const NewTravelPost = ({ history, user }) => {
  
  const cityRef = useRef();
  const countryRef = useRef();
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
      city: cityRef.current.value,
      country: countryRef.current.value,
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
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Lisbon . . ."
                  ref={cityRef}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  placeholder="Portugal . . ."
                  ref={countryRef}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  placeholder="lisbon,summer (separeted by commas / no space)"
                  ref={tagsRef}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Amazing times with my friends in Lisbon! . . ."
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

