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
import Room from './pages/Room'
import Cot from './pages/Cot'
import { Outlet, Navigate } from "react-router-dom";


function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Header />
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
                        </Route>
                        <Route element={<LoginPage />} path="/login" />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
