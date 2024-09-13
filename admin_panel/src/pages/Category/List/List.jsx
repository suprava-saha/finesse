import axios from "axios"; // Import axios for API requests
import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React
import Swal from "sweetalert2"; // Import SweetAlert2 for user-friendly alerts
import withReactContent from "sweetalert2-react-content"; // Import SweetAlert2 wrapper for React
import Table from 'react-bootstrap/Table'; // Import Table component from React Bootstrap
import Button from 'react-bootstrap/Button'; // Import Button component from React Bootstrap
import Container from 'react-bootstrap/Container'; // Import Container component from React Bootstrap
import Row from 'react-bootstrap/Row'; // Import Row component from React Bootstrap
import Col from 'react-bootstrap/Col'; // Import Col component from React Bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icons
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'; // Import delete and edit icons from FontAwesome
import "./List.css"; // Import custom styles

import 'react-responsive-modal/styles.css'; // Import modal styles
import { Modal } from 'react-responsive-modal'; // Import Modal component from react-responsive-modal

const MySwal = withReactContent(Swal); // Initialize SweetAlert2 with React content

const ListCategory = ({ url }) => {
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [open, setOpen] = useState(false); // State to control modal open/close status
  const [selectedCategory, setSelectedCategory] = useState(null); // State to store the category being edited
  const [updatedName, setUpdatedName] = useState(''); // State to store updated category name

  // Function to open modal for editing a category
  const onOpenModal = (category) => {
    setSelectedCategory(category); // Set the selected category to edit
    setUpdatedName(category.name); // Set the current name of the category in the modal input
    setOpen(true); // Open the modal
  };

  const onCloseModal = () => setOpen(false); // Function to close the modal

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/categories`); // Send GET request to fetch categories
      if (response.data) {
        setCategories(response.data); // Update the state with fetched categories
      } else {
        MySwal.fire('Error', 'Failed to fetch categories: ' + response.data.message, 'error'); // Show error if fetching fails
      }
    } catch (error) {
      MySwal.fire('Error', 'API call failed: ' + error.message, 'error'); // Show error if API call fails
    }
  };

  // Function to update category details
  const updateCategory = async () => {
    try {
      const response = await axios.put(`${url}/api/categories/${selectedCategory._id}`, { name: updatedName }); // Send PUT request to update category
      if (response.data) {
        MySwal.fire('Success', 'Category updated successfully', 'success'); // Show success message
        fetchCategories(); // Refresh the category list
        onCloseModal(); // Close the modal after updating
      } else {
        MySwal.fire('Error', 'Failed to update category: ' + response.data.message, 'error'); // Show error if update fails
      }
    } catch (error) {
      MySwal.fire('Error', 'Error updating category: ' + error.message, 'error'); // Show error if API call fails
    }
  };

  // SweetAlert confirmation and deletion process
  const removeCategory = async (categoryId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${url}/api/categories/${categoryId}`); // Send DELETE request to remove category
          if (response.data) {
            MySwal.fire('Deleted!', 'Your category has been deleted.', 'success'); // Show success message
            fetchCategories(); // Refresh the list after deletion
          } else {
            MySwal.fire('Error', 'Failed to remove category: ' + response.data.message, 'error'); // Show error if deletion fails
          }
        } catch (error) {
          MySwal.fire('Error', 'Error removing category: ' + error.message, 'error'); // Show error if API call fails
        }
      }
    });
  };

  // UseEffect to fetch categories when component mounts
  useEffect(() => {
    fetchCategories(); // Call fetchCategories on component mount
  }, [url]);

  return (
    <Container className="list-area2 add"> {/* Container for the component */}
      <Row>
        <Col>
          <h3 className="text-center">All Categories List</h3> {/* Title */}
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="list-table">
            <div className="list-table-format title">
              <b>#</b>
              <b>Name</b>
              <b colSpan="2">Actions</b> {/* Updated heading for edit/delete buttons */}
            </div>
            {categories.map((category, index) => (
              <div className="list-table-format" key={category._id}>
                <p>{index + 1}</p>
                <p>{category.name}</p>
                <p>
                  <Button variant="link" className="edit-button" onClick={() => onOpenModal(category)}> {/* Open modal for editing */}
                    <FontAwesomeIcon icon={faPen} /> {/* Edit icon */}
                  </Button>
                </p>
                <p>
                  <Button variant="link" className="delete-button" onClick={() => removeCategory(category._id)}> {/* Trigger category deletion */}
                    <FontAwesomeIcon icon={faTrashAlt} /> {/* Delete icon */}
                  </Button>
                </p>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      {/* Modal for editing category */}
      <Modal open={open} onClose={onCloseModal} center >
        <h2 className="modal-title">Edit Category</h2> {/* Modal title */}
        <form onSubmit={(e) => { e.preventDefault(); updateCategory(); }} className="modal-form"> {/* Form to handle category update */}
          <label>
            Category Name:
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)} // Update the name state as user types
              required
            />
          </label>
          <div className="modal-actions">
            <Button variant="primary" type="submit" className="update-btn">Update</Button> {/* Submit button to update category */}
            <Button variant="secondary" onClick={onCloseModal} className="cancel-btn">Cancel</Button> {/* Cancel button to close modal */}
          </div>
        </form>
      </Modal>
    </Container>
  );
};

export default ListCategory;

