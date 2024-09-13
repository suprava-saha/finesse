import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from "dayjs";
import "./Add.css"; // Ensure custom styles are imported

const MySwal = withReactContent(Swal);

const Add = ({ url }) => {
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    manufactureDate: "",
    expirationDate: "",
    quantity: "",
    thresholdLevel: "",
    cost: "",
  });
  const [categories, setCategories] = useState([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/categories`);
      if (response.data) {
        setCategories(response.data);
        setData((prevData) => ({
          ...prevData,
          categoryId: response.data[0]?._id || "", // Default to the first category if available
        }));
      } else {
        MySwal.fire('Error', 'Failed to fetch categories: ' + response.data.message, 'error');
      }
    } catch (error) {
      console.error('Categories Fetch Error:', error);
      MySwal.fire('Error', 'API call failed: ' + error.message, 'error');
    }
  };

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formattedData = {
      ...data,
      quantity: Number(data.quantity),
      thresholdLevel: Number(data.thresholdLevel),
      cost: Number(data.cost),
    };

    try {
      const response = await axios.post(`${url}/api/raw-materials`, formattedData);
      if (response.data) {
        setData({
          name: "",
          categoryId: categories[0]?._id || "",
          manufactureDate: "",
          expirationDate: "",
          quantity: "",
          thresholdLevel: "",
          cost: "",
        });
        MySwal.fire('Success', 'Raw Material has been created', 'success');
      } else {
        MySwal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      MySwal.fire('Error', 'Error submitting form: ' + error.message, 'error');
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [url]);

  return (
    <Container className="add-container add">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h3 className="mb-4">Add New Item</h3>
              <Form onSubmit={onSubmitHandler} className="add-form">
                <Form.Group controlId="formName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={data.name}
                    onChange={onChangeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCategory">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="categoryId"
                    value={data.categoryId}
                    onChange={onChangeHandler}
                    required
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formManufactureDate">
                  <Form.Label>Manufacture Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="manufactureDate"
                    value={data.manufactureDate}
                    onChange={onChangeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formExpirationDate">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="expirationDate"
                    value={data.expirationDate}
                    onChange={onChangeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    value={data.quantity}
                    onChange={onChangeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formThresholdLevel">
                  <Form.Label>Threshold Level</Form.Label>
                  <Form.Control
                    type="number"
                    name="thresholdLevel"
                    placeholder="Enter threshold level"
                    value={data.thresholdLevel}
                    onChange={onChangeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formcost">
                  <Form.Label>Total cost</Form.Label>
                  <Form.Control
                    type="number"
                    name="cost"
                    placeholder="cost"
                    value={data.cost}
                    onChange={onChangeHandler}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Add Item
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Add;
