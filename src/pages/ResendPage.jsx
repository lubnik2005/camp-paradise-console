import { useContext, useState, useEffect } from 'react'
import { createRoutesFromChildren } from 'react-router-dom';
import 'ui-neumorphism/dist/index.css'

const ResendPage = () => {

    let [email, setEmail] = useState('');

    const onEmailChange = (e) => { console.log(e); setEmail(e.target.value); }
    const resend = async () => {
        try {
            response = await fetch(import.meta.env.VITE_APP_API_URL + `resend?email=${email}`)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
    }, []);


    return (
        <>
            <input placeholder="E-mail" onChange={onEmailChange} name="email" value={email} />
            <button value="Resend" type="email" onClick={resend} >Resend</button>

        </>
    )
}

export default ResendPage
