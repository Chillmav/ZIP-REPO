import Stars from "./stars.jsx";
import './../styles/scroll.css';

export default function Preference( {preference, userPreferences, setUserPreferences, userImportances, setUserImportances, preferences} ) {

    const showStars = preference === "Color" || preference === "Mark";

    const featureMap = {
        "Shape": "Kształt",
        "Color": "Kolor",
        "Type": "Materiał",
        "Mark": "Marka"

    }

    function changePreferences(value) {
        setUserPreferences((prev) => {
            const current = prev[preference];
            return ({
                ...prev,
                [preference]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
            }
            )
        })
    }
    return (
        <div className="flex flex-col space-y-2 mr-5">
            <div className="flex ">
                <p className="text-[20px] text-[#555B4F] font-bold">{featureMap[preference]}:</p>
                {showStars && <Stars
                preference={preference}
                value={userImportances[preference]}
                setUserImportances={setUserImportances}
                /> }
                
                
            </div>

                <div className="space-y-2 overflow-auto h-[11vw] custom-scrollbar pr-6">
                {preferences[preference].map((elem, index) => {
                    const checked = userPreferences[preference].includes(elem)
                    return (
                    <label
                        key={index}
                        className={`flex items-center justify-between px-4 py-2 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        checked
                            ? 'bg-[#F7F6F3] border-[#6B705C] text-[#555B4F]'
                            : 'bg-[#F7F6F3] border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <span className="text-[18px]">{elem}</span>
                        <input
                        type="checkbox"
                        value={elem}
                        onChange={() => changePreferences(elem)}
                        checked={checked}
                        className="size-5 accent-[#6B705C] cursor-pointer"
                        />
                    </label>
                    )
                })}
                </div>
            
    </div>
    )
}