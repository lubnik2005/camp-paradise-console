import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const Form = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/login`
            },
            redirect: "if_required"
        });
        if (error) {
            setMessage(error.message)
        }
        setIsProcessing(false);
    }


    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={isProcessing}  >{isProcessing ? "Processing ..." : "Pay Now"}</button>
            {message}
        </form>
    )

}

const Checkout = ({ camp, room, cot }) => {
    let { user, accessToken, logoutUser } = useContext(AuthContext);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        if (accessToken?.accessToken) {
            fetch(import.meta.env.VITE_APP_API_URL + `config?token=${accessToken?.accessToken}`)
                .then(async (response) => {
                    const { publishableKey } = await response.json();
                    setStripePromise(loadStripe(publishableKey));
                    console.log(publishableKey);
                })
        }
    }, []);

    useEffect(() => {
        if (accessToken?.accessToken) {
            fetch(import.meta.env.VITE_APP_API_URL + `create-payment-intent?token=${accessToken?.accessToken}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id,
                    cot_id: cot.id,
                    room_id: room.id,
                    event_id: camp.id,
                })
            })
                .then(async (response) => {
                    const { clientSecret } = await response.json();
                    setClientSecret(clientSecret);
                })
        }
    }, []);

    return (
        <span>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <Form />
                </Elements>
            )}
        </span>
    );
};


const Cot = () => {

    const location = useLocation();
    const { camp, room, cot } = location.state;
    let { user, accessToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate();

    console.log(camp, room, cot);

    return (
        <div className="content" >
            <h4 align="center">{camp.name}</h4>
            <h3 align="center">{room.name}</h3>
            <h3 align="center">{cot.description}</h3>
            <Checkout camp={camp} room={room} cot={cot} />
        </ div >
    );
}

export default Cot;

