

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replacing useHistory with useNavigate
import { registerUser } from '../services/Api';

const SignUp = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            navigate('/login'); // Use navigate to redirect after successful registration
        } catch (err) {
            setError('Error registering. Please try again.');
        }
    };

    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <h2 style={{margin:"10px",padding:"10px"}}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{color:"red",fontWeight:"bold",padding:"10px",margin:"10px",background:"white"}}>{error}</p>}
        </div>
    );
};

export default SignUp;
