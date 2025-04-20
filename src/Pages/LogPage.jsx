import './../styles/LoginPage/LogPage.css'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LogPage() {

    const [personData, setPersonData] = useState([]);
    const firstNameRef = useRef(null);
    const secondNameRef = useRef(null);
    const navigate = useNavigate();
    const [isloggedIn, setIsLoggedIn] = useState(false)
    
    function login() {

        const data = [firstNameRef.current.value, secondNameRef.current.value]
        setPersonData(data)
        setIsLoggedIn(true);
    }

    function clearInputs() {
        firstNameRef.current.value = ''
        secondNameRef.current.value = ''
    }

    useEffect(() => {
        if (isloggedIn) {
            const data = {firstName: personData[0], secondName: personData[1]}
            
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                console.log('Response from server: ', res);
                navigate('/Cam')
            })
        }
    }, [isloggedIn])
    return (

        <div
        className="login-box-flex"
        >
            <p
            className='login-text'
            >Log in</p>
            <input placeholder="First Name" className='input' ref={firstNameRef} />
            <input placeholder="Second Name" className='input' ref={secondNameRef} />
            <button className='button' onClick={() => {
                login();
                clearInputs();
            }}>Log in</button>

        </div>
    )
}