import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";


const Buildings = () => {

    const location = useLocation();
    let { user, accessToken, logoutUser } = useContext(AuthContext)
    const { camp } = location.state;

    const CampInfo = () => {

        return (
            !!user ? (
                <div className="container">

                    <Link to={"cabins"} state={{ camp }} >
                        <div align="center" className="card upcoming">
                            <div >
                                <h4>Cabins</h4>
                            </div>
                        </div>
                    </Link>
                    <Link to={"central-house"} state={{ camp }} >
                        <div align="center" className="card upcoming">
                            <div >
                                <h4>Central House</h4>
                            </div>
                        </div>
                    </Link>

                    <Link to={"dorm"} state={{ camp }}>
                        <div align="center" className="card upcoming">
                            <div >
                                <h4>{user.sex === "m" ? "Men" : "Women"}'s Dorm</h4>
                            </div>
                        </div>
                    </Link>
                    <div align="center" className="card upcoming">
                        <div >
                            <h4>Camp Image Zoomable</h4>
                        </div>
                    </div>
                </div>
            ) : null
        )
    }


    return (
        <div className="container">
            <CampInfo />
        </ div>
    );
}

export default Buildings;

