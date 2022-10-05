import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
const API_URL = "http://localhost:2200/api/"


const Room = () => {

    const location = useLocation();
    const { camp, room } = location.state;
    const [cots, setCots] = useState([]);
    let { user, accessToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const getCots = async (accessToken) => {
        // Should be in a separate file, but I'm too dumb to figure out 
        // how to make that clean.
        try {
            const response = await fetch(API_URL + `cots` + `?room_id=${room.id}&event_id=${camp.id}&token=${accessToken}`);
            const data = await response.json();
            if (response.status === 200) {
                return data
            }
            if (response["status"] === "Token is Invalid") return [];
            return [];
        }
        catch (e) {
            return [];
        }
    }

    React.useEffect(() => {
        const fetchData = async () => setCots((await getCots(accessToken?.accessToken)) ?? []);
        fetchData();
    }, [accessToken]);

    const Cots = () => {
        return cots.map((cot) => {
            console.log(cot);
            return <div key={`cot-${cot.id}`} >
                <Link disabled={cot.first_name || cot.last_name} style={{ marginTop: '50px', backgroundColor: 'red' }} to="/cot" key={`cot-${cot.id}`} state={{ camp, room, cot }}>
                    ID: {cot.id}
                    Name: {cot.first_name} {cot.last_name}
                </Link>
            </div>
        }
        )

    }

    return (
        <div className="container" style={{ border: '1px solid' }}>
            <h4 align="center">{camp.name}</h4>
            <h3 align="center">{room.name}</h3>
            <h5>Available Cots</h5>
            {cots.filter(cot => cot.first_name || cot.last_name)
                .map((cot) => <Link disabled={cot.first_name || cot.last_name} to="/cot" key={`cot-${cot.id}`} state={{ camp, room, cot }}>
                    ID: {cot.id}
                    Name: {cot.first_name} {cot.last_name}
                </Link>
                )}
            <h5>Reserved Rooms</h5>
            {cots.filter(cot => !cot.first_name || !cot.last_name)
                .map((cot) => <div key={`cot-${cot.id}`} >
                    ID: {cot.id}
                    Name: {cot.first_name} {cot.last_name}
                </div>
                )}
        </ div >
    );
}

export default Room;

