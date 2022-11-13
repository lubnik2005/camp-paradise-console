import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import './App.css';

import HomePage from './pages/HomePage'
import Camps from './pages/Camps'
import LoginPage from './pages/LoginPage'
import Buildings from './pages/Buildings'
import VipHouse from './pages/VipHouse'
import Cabins from './pages/Cabins'
import Header from './components/Header'
import Footer from './components/Footer'
import Room from './pages/Room'
import Cot from './pages/Cot'
import Account from './pages/Account'
import { Outlet, Navigate } from "react-router-dom";
import { Card, TextField, Button } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';
import classes from './App.scss';



function App() {
    return (
        <Card className="App overflow-hidden" >
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            {/*<Route element={<HomePage />} path="/" exact />*/}
                            <Route element={<Navigate to="/camps" />} path="/" exact />
                            <Route element={<Camps />} path="/camps" exact />
                            <Route element={<Buildings />} path="/buildings" exact />
                            <Route element={<VipHouse />} path="/buildings/vip-house" exact />
                            <Route element={<Cabins />} path="/buildings/cabins" exact />
                            <Route element={<Room />} path="/room" exact />
                            <Route element={<Cot />} path="/cot" exact />
                            <Route element={<Account />} path="/account" exact />
                        </Route>
                        <Route element={<LoginPage />} path="/login" />
                    </Routes>
                    <Footer />
                </AuthProvider>
            </Router>
        </Card>
    );
}

export default App;
