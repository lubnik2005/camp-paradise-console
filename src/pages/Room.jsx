import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import { Button, ToggleButton, Card, CardContent, Subtitle2, Caption, IconButton, H4, H5, H6 } from 'ui-neumorphism'

import ChevronRightIcon from '~icons/mdi/chevron-right';


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
            const response = await fetch(import.meta.env.VITE_APP_API_URL + `cots` + `?room_id=${room.id}&event_id=${camp.id}&token=${accessToken}`);
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
                <Link style={{ marginTop: '50px', backgroundColor: 'red' }} to="/cot" key={`cot-${cot.id}`} state={{ camp, room, cot }}>
                    ID: {cot.id}
                    Name: {cot.first_name} {cot.last_name}
                </Link>
            </div>
        }
        )

    }

    return (
        <div className="content" >
            <h4 align="center">{camp.name}</h4>
            <h3 align="center">{room.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {cots.map((cot) => <Card style={{ margin: '10px' }}>  <CardContent>

                    <H5>
                        {cot.description}
                    </H5>
                    {!cot.first_name && !cot.last_name ? <Link to="/cot" key={`cot-${cot.id}`} state={{ camp, room, cot }}>
                        <Button style={{ marginTop: '20px' }} color='var(--primary)'>Buy Now</Button></Link> : <Subtitle2>{cot.first_name} {cot.last_name}</Subtitle2>}
                </CardContent></Card>)}
            </div>
        </ div >
    );
}

export default Room;

