import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import "./List.css"; // Ensure custom styles are imported
import { Modal } from 'react-responsive-modal'; // Import modal component
import 'react-responsive-modal/styles.css'; // Modal styles
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const MySwal = withReactContent(Swal); // Initialize SweetAlert2 with React content

const List = ({ url }) => {
  const [prevNumber, setPrevNumber] = useState(1);
  const [prevColumn, setPrevColumn] = useState("");

  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null); // State to store the food item to be edited
  const [open, setOpen] = useState(false); // State to control modal visibility

  // State variables for form inputs
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [thresholdLevel, setThresholdLevel] = useState(0);
  const [cost, setcost] = useState(0);

  // Fetch the list of raw materials
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/raw-materials`);
      if (response.data) {
        setList(response.data);

      } else {
        MySwal.fire('Error', 'Failed to fetch data: ' + response.data.message, 'error');
      }
    } catch (error) {
      MySwal.fire('Error', 'API call failed: ' + error.message, 'error');
    }
  };

  // Fetch categories for mapping
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/categories`);
      if (response.data) {
        setCategories(response.data);

      } else {
        MySwal.fire('Error', 'Failed to fetch categories: ' + response.data.message, 'error');
      }
    } catch (error) {
      MySwal.fire('Error', 'API call failed: ' + error.message, 'error');
    }
  };

  // SweetAlert confirmation and deletion process
  const removeFood = async (foodId) => {
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
          const response = await axios.delete(`${url}/api/raw-materials/${foodId}`);
          if (response.data) {
            MySwal.fire('Deleted!', 'Your item has been deleted.', 'success');
            fetchList(); // Refresh the list after deletion
          } else {
            MySwal.fire('Error', 'Failed to remove item: ' + response.data.message, 'error');
          }
        } catch (error) {
          MySwal.fire('Error', 'Error removing item: ' + error.message, 'error');
        }
      }
    });
  };


  //Sort Items by columns
  const sortTable = async (columnName) => {
    try {
      // Determine the new sort order
      let newSortOrder;
      if (prevColumn === columnName) {
        // Toggle between ascending (1) and descending (2)
        newSortOrder = prevNumber === 1 ? 2 : 1;
      } else {
        // Default to ascending (1) for a new column
        newSortOrder = 1;
      }

      // Update the state
      setPrevColumn(columnName);
      setPrevNumber(newSortOrder);

      // Use the updated sort order for the API call
      console.log(newSortOrder)
      const response = await axios.post(`${url}/api/raw-materials/sortCategory`, [columnName, newSortOrder]);
      console.log(response.data); // Log sorted data or handle it as needed
      setList(response.data); // Update state with sorted data
    } catch (error) {
      Swal.fire('Error', 'API call failed: ' + error.message, 'error');
    }
  };


  // Function to open the modal and load the selected food details for editing
  const onOpenModal = (item) => {
    setSelectedFood(item);
    setName(item.name);
    setCategoryId(item.categoryId);
    setManufactureDate(dayjs(item.manufactureDate).format('YYYY-MM-DD'));
    setExpirationDate(dayjs(item.expirationDate).format('YYYY-MM-DD'));
    setQuantity(item.quantity);
    setThresholdLevel(item.thresholdLevel);
    setcost(item.cost);
    setOpen(true);
  };

  // Function to close the modal
  const onCloseModal = () => setOpen(false);

  // Function to update the food item
  const updateFood = async () => {
    try {
      const response = await axios.put(`${url}/api/raw-materials/${selectedFood._id}`, {
        _id: selectedFood._id,
        name,
        categoryId,
        manufactureDate,
        expirationDate,
        quantity,
        thresholdLevel,
        cost
      });
      if (response.data) {
        MySwal.fire('Success', 'Item updated successfully', 'success');
        fetchList(); // Refresh the list after update
        onCloseModal(); // Close the modal
      } else {
        MySwal.fire('Error', 'Failed to update item: ' + response.data.message, 'error');
      }
    } catch (error) {
      MySwal.fire('Error', 'Error updating item: ' + error.message, 'error');
    }
  };

  // UseEffect to fetch list and categories in parallel when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchList(), fetchCategories()]);
      } catch (error) {
        MySwal.fire('Error', 'Failed to fetch data: ' + error.message, 'error');
      }
    };

    fetchData();
  }, [url]);

  return (
    <Container className="list-container">
      <Row>
        <Col>
          <h2 className="text-center">All Food List</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive="sm" className="table text-center">
            <thead>
              <tr>
                <th><button onClick={() => sortTable("name")} className="sort-button">Name <FontAwesomeIcon icon={faSort} className="tiny-sort-icon" /> </button></th>
                <th><button onClick={() => sortTable("categoryId")} className="sort-button">Category <FontAwesomeIcon icon={faSort} className="tiny-sort-icon" /> </button></th>
                <th><button onClick={() => sortTable("manufactureDate")} className="sort-button" >Manufactured <FontAwesomeIcon icon={faSort} className="tiny-sort-icon" /> </button></th>
                <th><button onClick={() => sortTable("expirationDate")} className="sort-button" >Expiry <FontAwesomeIcon icon={faSort} className="tiny-sort-icon" /> </button></th>
                <th><button onClick={() => sortTable("quantity")} className="sort-button" >Quantity <FontAwesomeIcon icon={faSort} className="tiny-sort-icon" /> </button></th>
                <th><button onClick={() => sortTable("thresholdLevel")} className="sort-button" >Threshold <FontAwesomeIcon icon={faSort} className="tiny-sort-icon" /> </button></th>
                <th><button onClick={() => sortTable("cost")} className="sort-button" >Total Cost <FontAwesomeIcon icon={faSort} className="tiny-sort-icon" /> </button></th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{categories.find(cat => cat._id === item.categoryId)?.name || 'Unknown'}</td>
                  <td>{dayjs(item.manufactureDate).format('DD MMMM, YYYY')}</td>
                  <td>{dayjs(item.expirationDate).format('DD MMMM, YYYY')}</td>
                  <td>{item.quantity}</td>
                  <td>{item.thresholdLevel}</td>
                  <td>{item.cost}</td>
                  <td>
                    <Button variant="link" className="edit-button" onClick={() => onOpenModal(item)}>
                      <FontAwesomeIcon icon={faPen} /> {/* Edit icon */}
                    </Button>
                  </td>
                  <td>
                    <Button variant="link" className="delete-button" onClick={() => removeFood(item._id)}>
                      <FontAwesomeIcon icon={faTrashAlt} /> {/* Delete icon */}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal for editing food item */}
      <Modal open={open} onClose={onCloseModal} center>
        <h2 className="modal-title">Edit Raw Material</h2>
        <form onSubmit={(e) => { e.preventDefault(); updateFood(); }} className="modal-form">
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Category:
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </label>
          <label>
            Manufacture Date:
            <input type="date" value={manufactureDate} onChange={(e) => setManufactureDate(e.target.value)} required />
          </label>
          <label>
            Expiry Date:
            <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />
          </label>
          <label>
            Quantity:
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </label>
          <label>
            Threshold Level:
            <input type="number" value={thresholdLevel} onChange={(e) => setThresholdLevel(e.target.value)} required />
          </label>
          <label>
            Total Cost:
            <input type="number" value={cost} onChange={(e) => setcost(e.target.value)} required />
          </label>
          <div className="modal-actions">
            <Button variant="primary" type="submit" className="update-btn btn1">Update</Button>
            <Button variant="secondary" onClick={onCloseModal} className="cancel-btn">Cancel</Button>
          </div>
        </form>
      </Modal>
    </Container>
  );
};

export default List;
