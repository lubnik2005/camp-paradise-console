import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import logo from '../logo.png'; // Tell webpack this JS file uses this image

import { Card, TextField, Button, Alert, RadioGroup, Radio } from 'ui-neumorphism'
import { Link } from 'react-router-dom';

import 'ui-neumorphism/dist/index.css'

const RegisterPage = () => {
    let { registerUser } = useContext(AuthContext)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessages, setAlertMessages] = useState([]);

    const register = async () => {
        let response = await registerUser(gender, firstName, lastName, email, password, passwordConfirm);
        if (response?.hasOwnProperty('error')) {
            console.log("TEMP");
            console.log(response);
            setAlertMessages(response.error);
            setAlertVisible(true);
        }
    }

    const handleGenderChange = (e) => { console.log(e.value); setGender(e.value); }
    const handleFirstNameChange = (e) => setFirstName(e.value);
    const handleLastNameChange = (e) => setLastName(e.value);
    const handleEmailChange = (e) => setEmail(e.value);
    const handlePasswordChange = (e) => setPassword(e.value);
    const handlePasswordConfirmChange = (e) => setPasswordConfirm(e.value);

    return (
        <>
            <picture className={'logo-frame'}>
                <img src={logo} className={'logo'} alt="camp-paradise-logo" />
            </picture>
            <div className={'login-item'}>
                <Alert
                    type='error'
                    closable
                    border='left'
                    visible={alertVisible}
                    onClose={() => setAlertVisible(false)}><ul>{Object.values(alertMessages).map(messages => (messages.map(message => <li>{message}</li>)))}</ul></Alert>
                <div className={'form form-login'}>

                    <div className={"form-field"}>
                        <RadioGroup
                            onChange={handleGenderChange}
                            value={password}
                            inputStyles={{ width: '300px' }}
                            color='var(--primary)'
                            name="gender" type="radio" className={"form-input"} placeholder="Gender" required >
                            <Radio value='m' label='Guy' />
                            <Radio value='f' label='Gal' />
                        </RadioGroup>
                    </div>

                    <div className={"form-field"}>
                        <TextField
                            value={email}
                            inputStyles={{ width: '300px' }}
                            onChange={handleFirstNameChange}
                            name="email"
                            type="text"
                            className={'form-input'}
                            placeholder="First Name"
                            required />
                    </div>

                    <div className={"form-field"}>
                        <TextField
                            value={email}
                            inputStyles={{ width: '300px' }}
                            onChange={handleLastNameChange} name="email" type="text" className={'form-input'} placeholder="Last Name" required />
                    </div>

                    <div className={"form-field"}>
                        <TextField value={email}
                            inputStyles={{ width: '300px' }}
                            onChange={handleEmailChange} name="email" type="text" className={'form-input'} placeholder="Email" required />
                    </div>

                    <div className={"form-field"}>
                        <TextField
                            value={password}
                            inputStyles={{ width: '300px' }}
                            onChange={handlePasswordChange} name="password" type="password" className={"form-input"} placeholder="Password" required />
                    </div>

                    <div className={"form-field"}>
                        <TextField
                            value={password}
                            inputStyles={{ width: '300px' }}
                            onChange={handlePasswordConfirmChange} name="password" type="password" className={"form-input"} placeholder="Confirm Password" required />
                    </div>

                    <div className={"form-field"}>
                        <Button onClick={register} style={{ width: '300px', marginLeft: '20px', marginBottom: '30px' }}>Register</Button>
                    </div>
                </div>
                <Link to={"/login"}><Button style={{ width: '300px', marginLeft: '10px' }}>Login</Button></Link>
                <p>What we collect and why:</p>
                <ul>
                    <li><strong>First name/Last name:</strong> To verify purchased tickets at the camp.</li>
                    <li><strong>Gender:</strong>Will determine the type of rooms that can be reserved.</li>
                    <li><strong>Email:</strong>For logging in, password resets, and notifications.</li>
                    <li><strong>Hashed Password:</strong>Duh</li>
                    <li><strong>Stripe Information:</strong>We have a link to the purchase stripe information. Please view stripe terms of service for more details.</li>
                    <li><strong>Current and previous reserved rooms</strong></li>
                </ul>
                <p>You have access to view all this information with the exception:</p>
                <ul>
                    <li>of your stripe details (since it's stored on stripe)</li>
                    <li>and your hashed password</li>
                </ul>
            </div >
        </>
    )
}

export default RegisterPage 
