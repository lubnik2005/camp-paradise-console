import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'



const Account = () => {

    let { user, accessToken, logoutUser } = useContext(AuthContext)
    return (
        <div className="container" style={{ border: '1px solid' }}>
            <p>First Name: <input value={user.first_name} /></p>
            <p>Last Name: <input value={user.last_name} /></p>
            <p>Church: <select>
                <option>Independent Baptist Church (Astoria)</option>
                <option>59 Street</option>
                <option>Dry Creek</option>
                <option>Pinedale</option>
                <option>Other: {user.church}</option>
            </select></p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.sex == 'm' ? 'Male' : 'Female'}</p>
            <p>Account Created At: {user.created_at}</p>
            <button>Save</button>

            <h3>Registrations</h3>
        </ div >
    );
}

export default Account;

