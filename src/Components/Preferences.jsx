import preferences from "../utils/preferences.js";
import Preference from "./Preference";

export default function Preferences({ pricePreference, setPricePreference }) {

    
    return (
        <div className="flex flex-col p-[20px] gap-x-[10px] rounded-[10px] gap-y-[10px] w-[500px]">
            <p className='text-[25px] font-semibold mx-auto'>Preferences</p>
            <div className="flex space-x-5 items-center">
                <label className="text-[20px] font-bold">Price:</label>
                <input 
                id="slider"
                type="range"
                min={0}
                max={100}
                value={pricePreference}
                onChange={(event) => {
                    setPricePreference(event.target.value)
                }}
                className="w-[260px] appearance-none rounded-2xl"
                style={{
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    height: '6px',
                    borderRadius: '12px',
                    backgroundColor: '#078c9b',
                  }}
                />
                <p>($0 - ${pricePreference * 20})</p>

            </div>

            <div className="grid grid-cols-2 space-y-8 mt-2 space-x-2">
                {Object.keys(preferences).map((preference, i) => {
                    return (
                        <Preference
                        key={i}
                        name={preference}
                        
                        />
                    )
                })}
            </div>


        </div>
    )
}