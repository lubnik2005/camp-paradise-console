import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
const API_URL = "http://localhost:2200/api/"


const Cot = () => {

    const location = useLocation();
    const { camp, room, cot } = location.state;
    let { user, accessToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate();

    console.log(camp, room, cot);

    return (
        <div className="container" style={{ border: '1px solid' }}>
            <h4 align="center">{camp.name}</h4>
            <h3 align="center">{room.name}</h3>
            <h3 align="center">{cot.description}</h3>
            <button>Reserve</button>
        </ div >
    );
}

export default Cot;

