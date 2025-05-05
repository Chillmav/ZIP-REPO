import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Preferences from '../Components/Preferences';

export default function LogPage() {

    const [personData, setPersonData] = useState([]);
    const firstNameRef = useRef(null);
    const secondNameRef = useRef(null);
    const [pricePreference, setPricePreference] = useState(50);
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
        <div className='flex flex-row bg-white rounded-2xl'>
            <div
            className='flex flex-col p-[20px] gap-x-[10px] rounded-[10px] gap-y-[10px] w-[340px] items-center'
            >
                <p
                className='text-[25px] font-semibold m-[0px]'
                >Log in</p>
                <input placeholder="First Name" className='w-[300px] rounded-[5px] border-[#b0b0b0] border-[1px] py-[10px] px-[5px] cursor-pointer' ref={firstNameRef} />
                <input placeholder="Second Name" className='w-[300px] rounded-[5px] border-[#b0b0b0] border-[1px] py-[10px] px-[5px] cursor-pointer' ref={secondNameRef} />
                
                <button className='w-[300px] rounded-[5px] border-[1px] py-[10px] px-[5px] text-white bg-[#078c9b] cursor-pointer transition-bg-0.3s hover:bg-[#0abfbf]' onClick={() => {
                    login();
                    clearInputs();
                }}>Log in</button>
            </div>
            <Preferences
            pricePreference={pricePreference}
            setPricePreference={setPricePreference}
            />
        </div>
    )
}