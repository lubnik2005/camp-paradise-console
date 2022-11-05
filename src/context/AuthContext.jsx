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

    let loginUser = async (e) => {
        e.preventDefault();
        let response = false;
        // FIX: Use proper fetch error handling.
        try {
            response = await fetch(process.env.REACT_APP_API_URL + 'login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
            })
        } catch (error) {
            console.log(error);
            alert("Cannot connect to api.");
        }
        if (!response) return;

        let data = await response.json()

        if (response.status === 200) {
            await setAccessToken(data.accessToken)
            //setUser(jwt_decode(data.accessToken))
            setUser(data.user);
            console.log(data);
            localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
            navigate('/')
        } else {
            alert('Credentials not found.')
        }
    }


    let logoutUser = () => {
        setAccessToken(null)
        setUser(null)
        localStorage.removeItem('accessToken')
        navigate('/login')
    }


    let updateToken = async () => {

        console.log(localStorage.getItem('accessToken') && isJson(localStorage.getItem('accessToken')) ? JSON.parse(localStorage.getItem('accessToken')) : null);

        try {
            let response = await fetch(process.env.REACT_APP_API_URL + `refresh?token=${accessToken?.accessToken}`);
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
    }


    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval = setInterval(() => {
            if (accessToken) {
                updateToken()
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