import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
        navigate('/books'); // Navigate to the books page after login
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(to bottom, #000428, #004e92)' }}>
            <form onSubmit={handleSubmit} style={{ 
                width: '300px', 
                padding: '20px', 
                borderRadius: '10px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                backgroundColor: '#121212', 
                color: 'white' 
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            boxSizing: 'border-box', 
                            borderRadius: '5px', 
                            border: '1px solid #555', 
                            backgroundColor: '#1e1e1e', 
                            color: 'white' 
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            boxSizing: 'border-box', 
                            borderRadius: '5px', 
                            border: '1px solid #555', 
                            backgroundColor: '#1e1e1e', 
                            color: 'white' 
                        }}
                    />
                </div>
                <button 
                    type="submit" 
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: '#007BFF', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        transition: 'background 0.3s', 
                        cursor: 'pointer' 
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;