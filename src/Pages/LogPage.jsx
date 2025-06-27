import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Preferences from '../Components/Preferences';

export default function LogPage({ setUser }) {

    const [preferences, setPreferences] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/frames", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setPreferences(data)
            console.log(data)
        }
        )
    }, [])
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
            console.error('You didn’t choose all your preferences');
            setShowPopup(true); // show popup
            return 0;
        } 
    }
    setIsLoggedIn(true);
    }

    useEffect(() => {

        if (isloggedIn) {
            setUser([userPreferences, userImportances]);
            navigate('/Cam');
        }
        
    }, [isloggedIn])

    if (preferences.Shape) {
        return (

        <div className='flex flex-col rounded-2xl backdrop-blur-[8px] backdrop-saturate-[180%] bg-[rgba(255, 255, 255, 0.6)]'>

            <Preferences
            preferences={preferences}
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
            userImportances={userImportances}
            setUserImportances={setUserImportances}
            />
            <button className='bg-[#078c9b] rounded-2xl w-[50%] m-auto mb-[20px] cursor-pointer text-[20px] p-[5px]' onClick={() => login()}>
                Potwierdź
            </button>
            {showPopup && (
            <div className="fixed inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center z-50">
            <div className="bg-white/80 text-black p-6 rounded-2xl shadow-xl max-w-md text-center backdrop-blur-sm border border-gray-300">
                <p className="text-lg mb-4">Musisz wybrać wszystkie preferencje aby przejść dalej</p>
                <button
                onClick={() => setShowPopup(false)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                OK
                </button>
            </div>
            </div>
            )}
        </div>

    )
    }
    
}