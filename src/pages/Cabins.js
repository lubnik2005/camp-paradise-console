import React, { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { Outlet, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const Cabins = () => {

    const [rooms, setRooms] = useState(localStorage.getItem('rooms') ? JSON.parse(localStorage.getItem('rooms')) : []);
    let { user, accessToken, logoutUser } = useContext(AuthContext);
    const location = useLocation();
    const camp = location.state?.camp;


    const getRooms = async (eventId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}rooms?token=${accessToken.accessToken}&event_id=${eventId}`);
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
            <h3 align="center">Cabins</h3>
            {rooms.filter(room => room.type == 'cabin').map((room) => <Link key={`cabin-${room.id})}`} to="/room" state={{ camp, room }}>
                <div
                    align="center"
                    className="card upcoming"
                >
                    {room.name}</div>
            </Link>
            )}
        </ div>
    );
}

export default Cabins;

