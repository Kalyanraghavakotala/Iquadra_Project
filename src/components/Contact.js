import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Watermark } from 'antd';
const Rows = (props) => {
  return (
    <>
      <tr>
        <td>{props.sno}</td>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.mobile}</td>
        <td>{props.DOB}</td>
        <td>{props.relation}</td>
        <td>{props.social}</td>
        <td>{props.address}</td>
      </tr>
    </>
  )
}
function Contact() {
  const email = localStorage.getItem('usermail');
  const navig = useNavigate();
  const [search, setSearch] = useState('')
  const [searchdata, setSearchdata] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [add, setadd] = useState(false);
  const [details, setdetails] = useState({})
  const [contact, setcontacts] = useState([]);
  async function getcontacts() {
    const result = await fetch('http://localhost:8002/getcontacts', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const res = await result.json();
    // console.log(res);
    setcontacts(res);

  }
  function handleChange(e) {
    setdetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit() {
    alert('hii');
  }
  function addcontact() {
    setadd(true);
  }
  // console.log(contact)
  const handleSearch = () => {
    let data = contact.filter((ele) => {
      return ele.name.toLowerCase().includes(search.toLowerCase()) || ele.useremail.toLowerCase().includes(search.toLowerCase()) || ele.address.toLowerCase().includes(search.toLowerCase())
    })
    setSearchdata(data)
  }
  if (add) {
    navig('/addcontact');
  }
  useEffect(() => {
    getcontacts();
    // if (!localStorage.getItem('usermail')) navig('/')
  });
  return (
    <>
      <Watermark content={['iQuadra', 'aditya']} offset={[0, 0]}>
        <center>
          <div style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }} >
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', borderRadius: '10px', justifyContent: 'center', marginTop: '1%', boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
                <input type='text' placeholder='search here' style={{ height: '100%', width: '415px', padding: "5px 10px", borderRadius: '10px', border: 'none', outline: 'none' }} onChange={(e) => setSearch(e.target.value)} />
                <button className='btn btn-primary' onClick={handleSearch} >Search </button>

              </div>
              <button onClick={addcontact} className='btn btn-success' style={{ marginTop: '1%' }} >Add Contact</button>
              <button onClick={handleShow} className='btn btn-danger' style={{ marginTop: '1%' }}>Remove Contact</button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete contanct</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p id='error' style={{ color: 'red' }}></p>
                  <form style={{ maxWidth: '500px', width: '100%' }} onSubmit={handleSubmit}>
                    <label htmlFor="name" style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                      Contact_ID:
                    </label>
                    <input type="text" placeholder='enter the Contact_ID' id="id" name="id" required onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />


                  </form>
                </Modal.Body>
                <Modal.Footer>

                  <Button variant="danger" onClick={async () => {
                    handleClose();
                    const result = await fetch('http://localhost:8002/deletecontact', {
                      method: 'POST',
                      body: JSON.stringify(details),
                      headers: {
                        "Content-Type": "application/json"
                      }
                    })
                    console.log(result);

                  }}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>

            </div>
            <br />
            {search.length > 0 ? <>
              <h2>Search data</h2>
              <div id='table' >
                <div>
                  <Table responsive bordered='true' >
                    <thead>
                      <tr >
                        <th>Contact_ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>DOB</th>
                        <th>Relation</th>
                        <th>Social Media Links</th>
                        <th>Address</th>

                      </tr>
                    </thead>
                    <tbody>
                      {searchdata.length > 0 && searchdata.map((ele, i) => { return (<Rows sno={ele._id} name={ele.name} email={ele.useremail} mobile={ele.mobile} DOB={ele.dob} relation={ele.relation} social={ele.soc_link} address={ele.address} />) })}

                    </tbody>

                  </Table>
                </div>
                <br />

              </div>
            </> : <></>}
            <br />
            <br />
            <div className='tbl-container' id='table' >
              <Container className='container'>
                <Table responsive bordered='true' >
                  <thead>
                    <tr >
                      <th>Contact_ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>DOB</th>
                      <th>Relation</th>
                      <th>Social Media Links</th>
                      <th>Address</th>

                    </tr>
                  </thead>
                  <tbody>
                    {contact.map((ele, i) => { return (<Rows sno={ele._id} name={ele.name} email={ele.useremail} mobile={ele.mobile} DOB={ele.dob} relation={ele.relation} social={ele.soc_link} address={ele.address} />) })}
                  </tbody>

                </Table>
              </Container>
              <br />

            </div>
          </div>
        </center>
      </Watermark>
    </>
  )
}

export default Contact;
