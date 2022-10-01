import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {
    let [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null)
    console.log('before AuthProvider')
    console.log(accessToken)
    let [user, setUser] = useState(() => localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken')) : null)
    let [loading, setLoading] = useState(true)

    const history = useHistory()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:2200/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
        })
        let data = await response.json()

        if (response.status === 200) {
            console.log(data);
            await setAccessToken(data.accessToken)
            //setUser(jwt_decode(data.accessToken))
            console.log(data.accessToken);
            setUser(data.user);
            localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
            console.log(accessToken);
            history.push('/')
        } else {
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAccessToken(null)
        setUser(null)
        localStorage.removeItem('accessToken')
        history.push('/login')
    }


    let updateToken = async () => {

        console.log('refresh');
        console.log(accessToken);
        console.log(localStorage.getItem('accessToken'));
        console.log(localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null);
        let response = await fetch(`http://127.0.0.1:2200/api/refresh?token=${accessToken?.accessToken}`);
        // let response = await fetch(`http://127.0.0.1:2200/api/refresh?token=${accessToken}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     //body: JSON.stringify({ accessToken: authTokens?.refresh })
        //     body: JSON.stringify({ accessToken: accessToken?.accessToken ?? "" })
        // })


        try {
            let data = await response.json()
            if (response.status === 200) {
                setAccessToken(data.accessToken)
                //setUser(jwt_decode(data.access))
                //localStorage.setItem('authTokens', JSON.stringify(data))
                setUser(data);
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
