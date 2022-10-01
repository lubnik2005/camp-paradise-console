import React from "react";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";

const Room = () => {

    const location = useLocation();
    const { camp, room, cots } = location.state;

    React.useEffect(() => {


    }, []);


    const Cots = () => {
        return cots.map((cot) => <div key={`cot-${cot.id}`} >
            ID: {cot.id}
            Name: {cot.first_name} {cot.last_name}
        </div>)
    }

    return (
        <div className="container" style={{ border: '1px solid' }}>
            <h4 align="center">{camp.name}</h4>
            <h3 align="center">Room: {room.id}</h3>
            <Cots />
        </ div >
    );
}

export default Room;

