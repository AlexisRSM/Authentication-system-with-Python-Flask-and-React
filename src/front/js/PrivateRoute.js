import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PrivateRoute() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            axios.get('/protected', { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setUser(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                });
        }
    }, [navigate]);

    if (loading) {
        return <div className="text-center mt-5"><p>Loading...</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Dashboard</h2>
                    <p className="card-text">Welcome, {user.email}!</p>
                </div>
            </div>
        </div>
    );
}

export default PrivateRoute;
