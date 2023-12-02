import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Table } from 'react-bootstrap';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';



const Rows = (props) => {
  const navig = useNavigate()
  // useEffect(() => {
  //   if (!localStorage.getItem('usermail')) navig('/')
  // })
  return (
    <>
      <tr>
        <td>{props.sno}</td>
        <td>{props.eventid}</td>
        <td>{props.event}</td>
        <td>{props.duedate}</td>
        <td>
          <input
            type="checkbox"
            onChange={() => props.handleCheckboxChange(props.eventid)}
          />
        </td>
      </tr>
    </>
  );
};

const TodoList = () => {
  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    width: "100%",
    backgroundColor: "white"
  };
  const inputContainer = {
    width: "100%",
  };
  const formStyle = {
    width: "80%",
    margin: "0 auto",
  };
  const email = localStorage.getItem('usermail');
  const [todo, setTodo] = useState([]);
  const [details, setDetails] = useState({ email: email, todo: 'yes' });

  async function getTodo() {
    const result = await fetch('http://localhost:8002/gettodo', {
      method: 'POST',
      body: JSON.stringify({ email: email, todo: 'yes' }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const res = await result.json();
    setTodo(res);
  }

  async function handleSubmit() {
    // alert(JSON.stringify(details))
    const result = await fetch('http://localhost:8002/addtodo', {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(result);
  }

  async function handleCheckboxChange(eventId) {
    const result = await fetch('http://localhost:8002/deleteevent', {
      method: 'POST',
      body: JSON.stringify({ id: eventId }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(result);

    // Update the state to remove the deleted row
    setTodo((prevTodo) => prevTodo.filter(item => item._id !== eventId));
  }

  function handleChange(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    getTodo();
  });

  return (
    <>
      <center><h1>TodoList</h1></center>
      <div className='col-md-6 offset-md-3' style={{ marginTop: '2%', marginBottom: '2' }}>
        <div>
          <form onSubmit={(e) => { e.preventDefault(); }} style={formStyle}>
            < span id='error' style={{ color: 'red' }}></span>
            <div style={inputContainer}>
              <input type="text" name="event" placeholder='enter the event details' onChange={handleChange} style={inputStyle} /><br />
              <input type="date" name="duedate" placeholder='enter the event details' onChange={handleChange} style={inputStyle} /><br />
              <center><button type="submit" onClick={handleSubmit} className="btn btn-success" style={{ padding: "10px 20px" }}>Add Event</button></center>
            </div><br />
          </form>
        </div>
      </div>
      <br />
      <div className='tbl-container x' id='table' >
        <div>
          <Table responsive bordered='true' >
            <thead>
              <tr >
                <th>SNO</th>
                <th>Event_ID</th>
                <th>Event</th>
                <th>Due date</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {todo.map((ele, i) => {
                return (
                  <Rows
                    key={ele._id}
                    sno={i + 1}
                    eventid={ele._id}
                    event={ele.event}
                    duedate={ele.duedate}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                )
              })}
            </tbody>
          </Table>
        </div>
        <br />
      </div>
    </>
  );
};

export default TodoList;
