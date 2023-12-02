import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
// import Modal from 'antd/es/modal/Modal'
import { AiOutlineReload } from "react-icons/ai";
import { Watermark } from 'antd';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
function Gallery() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [galData, setGalData] = useState({})
    const [description, setDesc] = useState("");
    const [galleryData, setGalleryData] = useState([]);
    const handleClose = () => setShow(false);
    const addGalleryData = async () => {
        try {
            const respon = await fetch('http://localhost:8002/gallery', {
                method: 'POST',
                body: JSON.stringify({
                    ...galData,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setShow(false)
        }
        catch (err) {
            alert('try again')
        }
    }
    const Gallery = async () => {
        const email = localStorage.getItem('usermail')
        if (!email) {
            alert('please login')
            return;
        }
        const response = await fetch('http://localhost:8002/getgallery', {
            method: 'POST',
            body: JSON.stringify({ email: email }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        setGalleryData(data)
    }
    useEffect(() => {
        Gallery();
    })
    const photoChange = (e) => {
        const email = localStorage.getItem('usermail')
        if (!email) {
            alert('please login')
            return;
        }
        const image = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = function () {
            setGalData({
                email: email,
                image: fileReader.result
            })
        }
        fileReader.onerror = function (err) {
            console.log(err)
            alert("please upload the image again");
        }
    }
    const DeleteGall = async (id) => {
        await fetch('http://localhost:8002/deleteGalleryItem', {
            method: 'POST',
            body: JSON.stringify({ id: id }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    return (
        <>
            <Watermark content={['iQuadra', 'aditya']} offset={[0, 0]}>

                <center><h3>Gallery</h3></center>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Modal show={show} onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Add picture</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p id='error' style={{ color: 'red' }}></p>
                            <form style={{ maxWidth: '500px', width: '100%' }} >
                                <label htmlFor="name" style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                                    Picture
                                </label>
                                <input type="file" accept='.jpg, .png, .jpeg' onChange={photoChange} name="image" required style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />
                                <label htmlFor="name" style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                                    Occasion:
                                </label>
                                <input onChange={(e) => setDesc(e.target.value)} type="text" placeholder='enter the Occasion name' id="id" name="description" required style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />

                            </form>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="danger" onClick={addGalleryData}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
                <br />
                <br />
                <div className='tbl-container' id='table' >
                    <Container>
                        <button onClick={handleShow} className='btn btn-success' style={{ margin: '1%', marginRight: '10px', transform: 'translateX(1150px)' }}>Add Pictures</button>
                        <Table responsive bordered='true' >
                            <thead>
                                <tr >
                                    <th>Picture</th>
                                    <th>Occasion</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    galleryData.length > 0 ? galleryData[0] != 'no' ?
                                        <>
                                            {
                                                galleryData.map((ele) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <img src={ele.image} alt="occ_imag" style={{ height: '300px', width: '250px' }} />
                                                            </td>
                                                            <td>
                                                                <h2>
                                                                    {ele.description} </h2>
                                                            </td>
                                                            <td>
                                                                <Button onClick={() => DeleteGall(ele._id)}>Delete</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </> :
                                        <>No data Found </> :
                                        <>Please wait Loading  <span class="reload"> <AiOutlineReload /> </span>
                                        </>
                                }
                            </tbody>
                        </Table>
                    </Container>
                    <br />

                </div >
            </Watermark >


        </>
    )
}

export default Gallery