import React from "react";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";

const CentralHouse = () => {

    const [cots, setCots] = React.useState([]);
    const location = useLocation();
    const camp = location.state.camp;
    const rooms = [{ id: 1, name: "Mens Room 4" }];
    let room = rooms[0];

    React.useEffect(() => {

        setCots([{ first_name: 'A', last_name: 'Person', id: '1' },
        { first_name: '', last_name: '', id: "2" }
        ])

    }, []);



    return (
        <div className="container" style={{ border: '1px solid' }}>
            <h4 align="center">{camp.name}</h4>
            <h3 align="center">Central House</h3>
            <div className="side">
                <ul className="flex-container">
                    <Link to="/room" state={{ camp, room, cots }}>
                        <li className="flex-item">Room 1</li>
                    </Link>
                    <li className="flex-item">Room 2</li>
                    <li className="flex-item">Room 3</li>
                    <li className="flex-item">Room 4</li>
                    <li className="flex-item">Room 5</li>
                    <li className="flex-item">Room 6</li>
                </ul>
            </div>
        </ div>
    );
}

export default CentralHouse;

