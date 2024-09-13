import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Add.css"; // Ensure custom styles are imported

const MySwal = withReactContent(Swal);

const AddCategory = ({ url }) => {
  const [data, setData] = useState({
    name: "",
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${url}/api/categories`, data);
      if (response.data) {
        setData({ name: "" });
        MySwal.fire('Success', 'Category has been added', 'success');
      } else {
        MySwal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      MySwal.fire('Error', 'Error submitting form: ' + error.message, 'error');
    }
  };

  return (
    <Container className="add">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">Add New Category</h3>
              <Form onSubmit={onSubmitHandler} className="add-form">
                <Form.Group controlId="formName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter category name"
                    value={data.name}
                    onChange={onChangeHandler}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Add
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCategory;
