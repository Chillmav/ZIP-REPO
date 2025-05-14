import preferences from "../utils/preferences.js";
import Preference from "./Preference";
import Stars from "./stars.jsx";

export default function Preferences({ userPreferences, setUserPreferences, userImportances, setUserImportances }) {

    
    return (
        <div className="flex flex-col backdrop-blur-[16px] backdrop-saturate-[180%] bg-[rgba(216,176,190,0.2)] p-[20px] gap-x-[10px] rounded-[10px] gap-y-[10px] w-auto m-[10px]">
            <p className='text-[25px] font-semibold mx-auto mb-4'>Preferences</p>
            <div className="flex flex-col space-y-5">
                <div className="flex items-center space-x-2">
                    <label className="text-[20px] font-bold">AI:</label>
                    <input 
                    id="slider"
                    type="range"
                    min={0}
                    max={100}
                    value={userPreferences.AI}
                    onChange={(event) => {
                        setUserPreferences((prev) => ({
                            ...prev,
                            AI: Number(event.target.value)
                        }));
                    }}
                    className="w-[200px] appearance-none rounded-2xl"
                    style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        height: '6px',
                        borderRadius: '12px',
                        backgroundColor: '#078c9b',
                    }}
                    />
                    <p className="text-[20px] font-bold">Your Preferences</p>
                </div>
                <div className="flex items-center space-x-2">
                    <label className="text-[20px] font-bold">Max:</label>
                    <input 
                    id="slider"
                    type="range"
                    min={0}
                    max={100}
                    value={userPreferences.Price}
                    onChange={(event) => {
                        setUserPreferences((prev) => ({
                            ...prev,
                            Price: Number(event.target.value)
                        }));
                    }}
                    className="w-[200px] appearance-none rounded-2xl"
                    style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        height: '6px',
                        borderRadius: '12px',
                        backgroundColor: '#078c9b',
                    }}
                    />
                    <p className="w-[60px]">(${userPreferences.Price * 20})</p>
                    <Stars
                    preference={'Price'}
                    value={userImportances['Price']}
                    setUserImportances={setUserImportances}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 space-y-8 mt-2 space-x-2">
                {Object.keys(preferences).map((preference, i) => {
                    return (
                        <Preference
                        key={i}
                        preference={preference}
                        userPreferences={userPreferences}
                        setUserPreferences={setUserPreferences}
                        userImportances={userImportances}
                        setUserImportances={setUserImportances}
                        />
                    )
                })}
            </div>


        </div>
    )
}