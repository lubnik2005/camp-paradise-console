import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


export const AuthProvider = ({ children }) => {
    let [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') && isJson(localStorage.getItem('accessToken')) ? JSON.parse(localStorage.getItem('accessToken')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('accessToken') && isJson(localStorage.getItem('accessToken')) ? jwt_decode(localStorage.getItem('accessToken')) : null)
    let [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    let loginUser = async (email, password) => {
        let response = false;
        // FIX: Use proper fetch error handling.
        try {
            response = await fetch(import.meta.env.VITE_APP_API_URL + 'login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
        } catch (error) {
            console.log(error);
            return { error: { error: ['Cannot connect to api.'] } }
        }
        if (!response) return { error: { error: ['Cannot connect to api.'] } };

        let data = await response.json()

        if (response.status === 200) {
            await setAccessToken(data.accessToken)
            //setUser(jwt_decode(data.accessToken))
            setUser(data.user);
            console.log(data);
            localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
            navigate('/')
        } else {
            console.log(data)
            return data;
            console.log("NOT FOUND");
            return { error: { error: ['Credentials not found.'] } };
        }
    }

    let registerUser = async (gender, firstName, lastName, email, password, passwordConfirm) => {
        let response = false;
        // FIX: Use proper fetch error handling.
        try {
            response = await fetch(import.meta.env.VITE_APP_API_URL + 'register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gender,
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    password_confirm: passwordConfirm
                })
            })
        } catch (error) {
            console.log(error);
            return { error: { error: ['Cannot connect to api.'] } }
        }
        if (!response) return { error: { error: ['Cannot connect to api.'] } };

        let data = await response.json()

        if (response.status === 200) {
            console.log('Created new user');
            navigate('/login');
            return
        } else {
            console.log("NOT FOUND");
            return { error: data.error };
        }
    }



    let logoutUser = () => {
        setAccessToken(null)
        setUser(null)
        localStorage.removeItem('accessToken')
        //navigate('/login')
    }


    let updateToken = async () => {

        console.log(localStorage.getItem('accessToken') && isJson(localStorage.getItem('accessToken')) ? JSON.parse(localStorage.getItem('accessToken')) : null);

        try {
            let response = await fetch(import.meta.env.VITE_APP_API_URL + `refresh?token=${accessToken?.accessToken}`);
            let data = await response.json()
            if (response.status === 200) {
                setAccessToken(data.accessToken)
                //setUser(jwt_decode(data.access))
                //localStorage.setItem('authTokens', JSON.stringify(data))
                setUser(data.user);
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
            } else {
                logoutUser()
            }
        } catch (e) {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        accessToken: accessToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
    }


    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval = setInterval(() => {
            if (accessToken) {
                //updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [accessToken, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
