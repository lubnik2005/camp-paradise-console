import React, { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { Outlet, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const Cabins = () => {

    const [cots, setCots] = React.useState([]);
    let { user, accessToken, logoutUser } = useContext(AuthContext);
    const location = useLocation();
    const { camp } = location.state;
    const rooms = [{ id: 1, name: "Mens Room 4", type: "cabin", room: "A" }];
    let room = rooms[0];
    const API_URL = "http://localhost:2200/api/"


    const getCots = async (eventId) => {
        try {
            const response = await fetch(API_URL + `cots?event_id=${eventId}&token=${accessToken}`);
            const data = await response.json();
            if (response.status === 200) return data
            return [];


        }
        catch (e) {
            return [];
        }
    }
    React.useEffect(() => {
        const fetchData = async () => setCots(await getCots(camp.id));
        fetchData();

    }, []);

    const cabins = Array.from(Array(5))
        .map((e, i) => i + 65)
        .map((x) => ({ id: String.fromCharCode(x) }))

    return (
        <div className="container" style={{ border: '1px solid' }}>
            <h4 align="center">{camp.name}</h4>
            <h3 align="center">Cabins</h3>
            {cabins.map((cabin) => {

                return <Link key={`cabin-${cabin.id})}`} to="/room" state={{ camp, cabin }}>
                    <div
                        align="center"
                        className="card upcoming"
                    >
                        {cabin.id}</div>
                </Link>
            })}
        </ div>
    );
}

export default Cabins;

