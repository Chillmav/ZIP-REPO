import Preference from "./Preference";
import Stars from "./stars.jsx";
import { CiCircleInfo } from "react-icons/ci";

export default function Preferences({ userPreferences, setUserPreferences, userImportances, setUserImportances, preferences }) {

    return (
        <div className="flex flex-col bg-[#DDE5B6] p-5 rounded-2xl shadow-md w-[50vw] h-[72vh] m-4">
            <p className='text-[25px] text-[#2E2E2E] font-semibold mx-auto mb-4'>Wybierz swoje preferencje</p>
            <div className="flex flex-col space-y-5 items-center justify-center">
                <div className="flex items-center space-x-2 justify-center mb-5 mt-5">
                    <label className="text-[20px] font-bold text-[#555B4F]">Twoje preferencje:</label>
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
                    className="w-[25vw] appearance-none rounded-2xl"
                    style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        height: '6px',
                        borderRadius: '12px',
                        backgroundColor: '#6B705C',
                    }}
                    />
                    <p className="text-[20px] text-[#555B4F] font-bold">AI</p>
                    <div className="relative inline-block">
                        <CiCircleInfo size={30} className="cursor-pointer peer" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-sm text-[#555B4F] bg-white rounded shadow opacity-0 peer-hover:opacity-100 transition-opacity w-[500px] pointer-events-none">
                            Slider odpowiada za to jak bardzo chcesz aby rekomendacje oprawek w zakresie kształtu i typu były zależne od sztucznej inteligencji
                        </div>
                    </div>

                </div>
            
            </div>

            <div className="grid grid-cols-2 space-y-10 mt-2 mx-5">

                {Object.keys(preferences).map((preference, i) => {
                    return (
                        <Preference
                        key={i}
                        preference={preference}
                        userPreferences={userPreferences}
                        setUserPreferences={setUserPreferences}
                        userImportances={userImportances}
                        setUserImportances={setUserImportances}
                        preferences={preferences}
                        />
                    )
                })}

            </div>


        </div>
    )
}