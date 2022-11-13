import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import logo from '../logo.png'; // Tell webpack this JS file uses this image

import { Card, TextField, Button, Alert } from 'ui-neumorphism'

import 'ui-neumorphism/dist/index.css'

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const login = async () => {
        let response = await loginUser(email, password);
        if (response?.hasOwnProperty('error')) {
            setAlertMessage(response.error);
            setAlertVisible(true);
        }
    }
    const handleEmailChange = (e) => setEmail(e.value);
    const handlePasswordChange = (e) => setPassword(e.value);

    return (
        <>
            <picture className={'logo-frame'}>
                <img src={logo} className={'logo'} alt="camp-paradise-logo" />
            </picture>
            <div className={'login-item'}>
                <Alert type='error' closable border='left' visible={alertVisible} onClose={() => setAlertVisible(false)}>{alertMessage}</Alert>
                <div className={'form form-login'}>
                    <div className={"form-field"}>
                        <TextField value={email} inputStyles={{ width: '300px' }} onChange={handleEmailChange} name="email" type="text" className={'form-input'} placeholder="Username" required />
                    </div>

                    <div className={"form-field"}>
                        <TextField value={password} inputStyles={{ width: '300px' }} onChange={handlePasswordChange} name="password" type="password" className={"form-input"} placeholder="Password" required />
                    </div>

                    <div className={"form-field"}>
                        <Button onClick={login} style={{ width: '300px', marginLeft: '20px', marginBottom: '30px' }}>Login</Button>
                    </div>
                </div>
                <Button style={{ width: '300px', marginLeft: '10px' }}>Register</Button>
            </div >
        </>
    )
}

export default LoginPage
