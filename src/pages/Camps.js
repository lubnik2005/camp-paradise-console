import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
const API_URL = "http://localhost:2200/api/"

const Camps = () => {

    const [upcomingCamps, setUpcomingCamps] = useState([]);
    const [previousCamps, setPreviousCamps] = useState([]);
    let { user, accessToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const getCamps = async (accessToken, time = null) => {
        // Should be in a separate file, but I'm too dumb to figure out 
        // how to make that clean.
        try {
            const response = await fetch(API_URL + `${time ? `${time}_` : ""}events` + `?token=${accessToken}`);
            const data = await response.json();
            if (response.status === 200) {
                return data
            }
            return [];
        }
        catch (e) {
            return [];
        }
    }


    React.useEffect(() => {
        const fetchData = async () => setUpcomingCamps(await getCamps(accessToken.accessToken, 'upcoming'));
        const fetchDataP = async () => setPreviousCamps(await getCamps(accessToken.accessToken, 'previous'));
        fetchData();
        fetchDataP();
    }, [accessToken])

    const UpcomingCamps = () => {
        return upcomingCamps.map(camp => (
            <Link to={"/buildings"} key={`camp-${camp.id}`} state={{ camp }}>
                <div align="center" className="card upcoming">
                    <div >
                        <h4>{camp.name}</h4>
                        <p>{camp.start_on.slice(0, 10)} - {camp.end_on.slice(0, 10)}</p>
                    </div>
                </div>
            </Link>
        ))
    }

    const PreviousCamps = () => {
        return previousCamps.map(camp => (
            <div align="center" className="card previous" key={`camp-${camp.id}`} >
                <div >
                    <h4>{camp.name}</h4>
                    <p>{camp.start_on.slice(0, 10)} - {camp.end_on.slice(0, 10)}</p>
                </div>
            </div>
        ))
    }

    return (
        <div className="container" >
            <span >
                <h3 align="center">Upcoming Camps</h3>
                <p align="center">
                    <Link to={"/guidelines"} className="nav-link">
                        Guidelines
                    </Link>
                </p>
                <UpcomingCamps />
                <h3 align="center">Previous Camps</h3>
                <PreviousCamps />
            </span>
        </div>
    );
}

export default Camps;