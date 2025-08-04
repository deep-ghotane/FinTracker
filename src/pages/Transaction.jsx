import axios from "axios";
import React, { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { removeTransaction } from "../features/transactions/transactionActions.js";

const Transaction = () => {
  const { testFunction2, user } = useUser();

  const [show, setShow] = useState(false);

  const [idsToDelete, setIdesToDelete] = useState([]);

  const { form, setForm, handleOnChange } = useForm({
    type: "income",
    description: "",
    amount: 0,
    date: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [total, setTotal] = useState(0);

  // const [transactions, setTransactions] = useState([]);

  // redux
  const dispatch = useDispatch();
  const { transactions } = useSelector((store) => store.transactionStore);

  // const {user} = useSelector((store)=>)

  // transactionStore.transactions

  // const fetchTransaction = async () => {
  //   console.log(testFunction2());
  //   // fetch the token from localstorage

  //   let data = await getTransation();

  //   console.log(data);
  //   dispatch(setTransactions(data.transactions));

  //   let tempTotal = data.transactions.reduce((acc, item) => {
  //     return item.type == "income"
  //       ? acc + parseFloat(item.amount)
  //       : acc - parseFloat(item.amount);
  //   }, 0);

  //   console.log(tempTotal);
  //   setTotal(tempTotal);
  // };

  useEffect(() => {
    setTotal(
      transactions.reduce(
        (acc, item) =>
          item.type == "income" ? acc + item.amount : acc - item.amount,
        0
      )
    );
  }, [transactions]);

  const handleOnDelete = async (id, isMany) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    const toDeletData = isMany ? idsToDelete : [id];
    // delete axios
    // let data = await deleteTransaction(toDeletData);
    // if (data.status) {
    //   toast.success(data.message);
    //   fetchTransaction();
    // } else {
    //   toast.error(data.message);
    // }

    let data = await dispatch(removeTransaction(toDeletData));

    toast[data.status ? "success" : "error"](data.message);
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    //this to handle select all checkbox
    if (value === "all") {
      // get all the ids from transactions
      checked
        ? setIdesToDelete(transactions.map((t) => t._id))
        : setIdesToDelete([]);

      // and set it to idsToDelete
      return;
    }

    if (checked) {
      //check for the duplicate id
      // !idsToDelete.includes(value) &&
      setIdesToDelete([...idsToDelete, value]);
    } else {
      //remove the id from the arrary
      setIdesToDelete(idsToDelete.filter((id) => id !== value));
    }
  };

  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded-5">
        <Col>
          <div>
            <h1>Transaction</h1> {user?.username}
            <button
              className="btn btn-primary"
              onClick={() => {
                setForm({
                  type: "income",
                  description: "",
                  amount: 0,
                  date: "",
                });

                handleShow();
              }}
            >
              Add
            </button>
            <hr />
            <div>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  value="all"
                  label="Select/Unselect all"
                  onChange={handleOnSelect}
                  checked={
                    transactions.length === idsToDelete.length &&
                    transactions.length > 0
                  }
                />
              </Form.Group>
            </div>
            <Table hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Select</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Out</th>
                  <th>In</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          value={t._id}
                          onChange={handleOnSelect}
                          checked={idsToDelete.includes(t._id)}
                        />
                      </td>
                      <td>{t.date.split("T")[0]}</td>
                      <td>{t.description}</td>
                      <td className="text-danger">
                        {t.type == "expense" ? "$" + t.amount : ""}
                      </td>
                      <td className="text-success">
                        {t.type == "income" ? "$" + t.amount : ""}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => {
                            handleOnDelete(t._id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setForm(t);
                            handleShow();
                          }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  {/* <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td> */}
                  <td colSpan={6}></td>
                  <td>Total : {total}</td>
                </tr>
              </tbody>
            </Table>
            {idsToDelete.length > 0 && (
              <div className="d-grid">
                <Button
                  variant="danger"
                  onClick={() => handleOnDelete(null, true)}
                >
                  Delete {idsToDelete.length} transactions
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{form?._id ? "Update" : "Add"} Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm
            form={form}
            setForm={setForm}
            handleOnChange={handleOnChange}
            // fetchTransaction={fetchTransaction}
            handleClose={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Transaction;
