import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Preferences from '../Components/Preferences';

export default function LogPage() {

    const firstNameRef = useRef(null);
    const secondNameRef = useRef(null);
    
    const [userPreferences, setUserPreferences] = useState(
        {
            AI: 50,
            Price: 50,
            Shape: [],
            Mark: [],
            Type: [],
            Color: []
        }
    );

    const [userImportances, setUserImportances] = useState({
        Price: 2.5,
        Shape: 2.5,
        Mark: 2.5,
        Type: 2.5,
        Color: 2.5
    })

    const navigate = useNavigate();
    const [isloggedIn, setIsLoggedIn] = useState(false)

    function login() {

        for (let preference of Object.keys(userPreferences)) {
            if (!userPreferences[preference].length && !Number(userPreferences[preference])) {
                console.error('You didn`t choose all your preferences');
                return 0;
            }   
        }
        setIsLoggedIn(true);

    }

    function clearInputs() {
        firstNameRef.current.value = ''
        secondNameRef.current.value = ''
    }

    useEffect(() => {
        if (isloggedIn) {
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstName: firstNameRef.current.value, secondName: secondNameRef.current.value, userPreferences: userPreferences, userImportances: userImportances})
            })
            .then(res => res.json())
            .then(res => {
                console.log('Response from server: ', res);
                clearInputs();
                navigate('/Cam');
            })
        }
    }, [isloggedIn])
    
    return (

        <div className='flex flex-row rounded-2xl backdrop-blur-[8px] backdrop-saturate-[180%] bg-[rgba(255,255,255,0.5)]'>

            <div
            className='flex flex-col justify-center p-[20px] gap-x-[10px] rounded-[10px] gap-y-[10px] w-[340px] items-center'
            >

                <p
                className='text-[25px] font-semibold m-[0px]'
                >Log in</p>
                <input placeholder="First Name" className='w-[300px] rounded-[5px] border-[#b0b0b0] border-[1px] py-[10px] px-[5px] cursor-pointer' ref={firstNameRef} />
                <input placeholder="Second Name" className='w-[300px] rounded-[5px] border-[#b0b0b0] border-[1px] py-[10px] px-[5px] cursor-pointer' ref={secondNameRef} />
                
                <button className='w-[300px] rounded-[5px] border-[1px] py-[10px] px-[5px] text-black backdrop-blur-[16px] backdrop-saturate-[180%] bg-[rgba(255,255,255,0.4)] cursor-pointer transition-bg-0.3s hover:bg-[rgba(255,255,255,0.6)]' onClick={() => {
                    login();
                    
                }}>Log in</button>

            </div>

            <Preferences
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
            userImportances={userImportances}
            setUserImportances={setUserImportances}
            />

        </div>

    )
}