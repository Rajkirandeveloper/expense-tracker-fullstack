import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replacing useHistory with useNavigate
import { loginUser } from '../components/services/Api';
import { useAuth } from './Dashboard/context/AuthContext';
 import "./Login.css"

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            sessionStorage.setItem('token',data.token);
            localStorage.setItem('newjwt', data.token);
          

            login(data.user);
           
            navigate('/'); 
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className='container'>
            <h2 className='title'>Login Page</h2>
            <div>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>

                <p>Not Registred    <a  style={{color:"blue",fontWeight:"bold"}}href="/signup">SignUp</a></p>
            </form>
            </div>
            {error && <p className='error'>{error}</p>}
        </div>
    );
};

export default Login;
