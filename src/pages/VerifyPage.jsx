import { useContext, useState, useEffect } from 'react'
import 'ui-neumorphism/dist/index.css'

const VerifyPage = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token')
    let [verified, setVerified] = useState(false)
    let [success, setSuccess] = useState(false)
    console.log(token);

    const verify = async () => {
        try {
            let response = await fetch(import.meta.env.VITE_APP_API_URL + `verify?token=${token}`);
            console.log(response);
            setVerified(true);
            if (response.status === 200) setSuccess(true);
        } catch (error) {
            console.log(error);
            return { error: { error: ['Cannot connect to api.'] } }
        }
    }

    useEffect(() => {
        const fetchData = async () => verify();
        fetchData();
    }, []);


    return (
        <>
            {verified ?
                success ?
                    <div>Email Verified Please <a href="/login">Login</a></div> :
                    <div>Failed to verify email. Refresh page or <a href="/resend">Resend E-mail</a></div>
                :
                <>Verifying...</>}

        </>
    )
}

export default VerifyPage 
