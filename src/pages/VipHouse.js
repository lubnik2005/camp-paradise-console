import React, { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { Outlet, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const VipHouse = () => {

    const [rooms, setRooms] = useState(localStorage.getItem('rooms') ? JSON.parse(localStorage.getItem('rooms')) : []);
    let { user, accessToken, logoutUser } = useContext(AuthContext);
    const location = useLocation();
    const camp = location.state?.camp;
    const API_URL = "http://localhost:2200/api/"


    const getRooms = async (eventId) => {
        try {
            const response = await fetch(`${API_URL}rooms?token=${accessToken.accessToken}&event_id=${eventId}`);
            //const response = await fetch(API_URL + `rooms?event_id=${eventId}&token=${accessToken}`);
            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem(`rooms`, JSON.stringify(data));
                return data
            }
        }

        catch (e) { }
        return [];
    }
    React.useEffect(() => {
        const fetchData = async () => setRooms(await getRooms(camp.id));
        if (camp) fetchData();
    }, []);

    if (!camp) return <Navigate to={'/camps'} />

    return (
        <div className="container" style={{ border: '1px solid' }}>
            <h4 align="center">{camp.name}</h4>
            <h3 align="center">VIP House</h3>
            <div className="side">
                <ul className="flex-container">
                    {rooms.filter(room => room.type === 'vip').map((room) => {
                        return <Link to="/room" state={{ camp, room }}>
                            <li className="flex-item">{room.name}</li>
                        </Link>
                    })}
                </ul>
            </div>
        </ div>
    );
}

export default VipHouse;

