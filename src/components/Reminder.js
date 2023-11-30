// ReminderPage.js
import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
const Rows = (props) => {
  const formattedRemainders = props.remainders.replace(/\n/g, '<br>');
  return (
    <>
      <tr>
        <td>{props.sno}</td>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td dangerouslySetInnerHTML={{ __html: formattedRemainders }}></td>

      </tr>
    </>
  )
}
const ReminderPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [reminders, setReminders] = useState([]);
  const [details, setDetails] = useState({});
  const email = localStorage.getItem('usermail');
  const handleAddReminder = async () => {
    const result = await fetch('http://localhost:8002/getremainders', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const res = await result.json();
    console.log(res);
    setReminders(res);

  };
  const navig = useNavigate()
  function handleChange(e) {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    // if (!localStorage.getItem('usermail')) navig('/')
    handleAddReminder();
  });
  return (
    <>
      <Header />

      <center><h3>Reminders</h3></center>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button onClick={handleShow} className='btn btn-success' style={{ marginTop: '1%', marginRight: '10px' }}>Add Remainders</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Remainders</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p id='error' style={{ color: 'red' }}></p>
            <form style={{ maxWidth: '500px', width: '100%' }} >
              <label htmlFor="name" style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                Contact_ID:
              </label>
              <input type="text" placeholder='enter the Contact_ID' id="id" name="id" required onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />
              <label htmlFor="name" style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                Remainder:
              </label>
              <input type="text" placeholder='enter the remainder' id="id" name="remainders" required onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />

            </form>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="danger" onClick={async () => {
              const result = await fetch('http://localhost:8002/addremainders', {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                  "Content-Type": "application/json"
                }
              })
              console.log(result);
              handleClose()
            }}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
      <br />


      <br />
      <div className='tbl-container x' id='table' >
        <div>
          <Table responsive bordered='true' >
            <thead>
              <tr >
                <th>Contact_ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Remainders</th>


              </tr>
            </thead>
            <tbody>
              {reminders.map((ele, i) => { return (<Rows sno={ele._id} name={ele.name} email={ele.useremail} remainders={ele.remainders} />) })}

            </tbody>

          </Table>
        </div>
        <br />

      </div>

      <Footer />
    </>
  );
};

export default ReminderPage;
