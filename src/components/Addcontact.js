import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Addcontact() {
	const email = localStorage.getItem('usermail');
	const [formData, setFormData] = useState({ email: email, contact: 'yes' });
	const [add, setadd] = useState(false);
	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
		console.log(formData);
	};
	const navig = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		setadd(true);
		const result = await fetch('http://localhost:8002/contacts', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json"
			}
		})
		console.log(result);
	};
	// useEffect(() => {
	// 	if (!localStorage.getItem('usermail')) navig('/')
	// })
	if (add) {
		navig('/contacts')
	}
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
				<h1>Add Contacts</h1>
				<form style={{ maxWidth: '500px', width: '100%' }} onSubmit={handleSubmit}>
					<label htmlFor="name" style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
						Name:
					</label>
					<input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />

					<label htmlFor="email" style={{ fontSize: '18px', fontWeight: 'bold' }}>
						Email:
					</label>
					<input type="text" id="email" name="useremail" required value={formData.useremail} onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />
					<label htmlFor="name" style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
						Mobile:
					</label>
					<input type="text" id="name" name="mobile" required value={formData.mobile} onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />



					<label htmlFor="soc_link" style={{ fontSize: '18px', fontWeight: 'bold' }}>
						Social Media Link:
					</label>
					<input type="text" id="college" name="soc_link" required value={formData.college} onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />


					<label htmlFor="dob" style={{ fontSize: '18px', fontWeight: 'bold' }}>
						Date of Birth:
					</label>
					<input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />
					<label htmlFor="relation" style={{ fontSize: '18px', fontWeight: 'bold' }}>
						Relation:
					</label>
					{/* <input type="date" id="dob" name="relations" required value={formData.dob} onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} /> */}
					<select required style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} name="relation" onChange={handleChange}>
						<option>select your relation </option>
						<option value="Friend">Friend</option>
						<option value="relative">Relative</option>
						<option value="colleague">Colleague</option>
						<option value="classmate">Classmate</option>
						<option value="neighbor">Neighbor</option>
						<option value="business">Business</option>
						<option value="other">Other</option>
					</select><br />
					<label htmlFor="remainders" style={{ fontSize: '18px', fontWeight: 'bold' }}>
						Remainders:
					</label>
					<textarea id="address" name="remainders" required value={formData.remainders} onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }}></textarea>

					<label htmlFor="address" style={{ fontSize: '18px', fontWeight: 'bold' }}>
						Address:
					</label>
					<textarea id="address" name="address" required value={formData.address} onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }}></textarea>

					<button type="submit" style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white', width: '100%', cursor: 'pointer', marginTop: '16px', marginBottom: '8px' }}>Add</button>
				</form>
			</div>
		</>
	);
}

export default Addcontact;
