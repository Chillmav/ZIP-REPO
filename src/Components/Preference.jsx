import preferences from "../utils/preferences.js"

export default function Preference( {preference, userPreferences, setUserPreferences} ) {

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
        <div className="flex flex-col space-y-2">
            <div className="flex">
                <p className="text-[20px] font-bold">{preference}:</p>

            </div>

            
                {preferences[preference].map((elem, index) => {

                    return (
                            <p key={index} className="w-fit">{elem} 
                                <label key={index}>
                                <input value={elem} onChange={() => changePreferences(elem)} checked={userPreferences[preference].includes(elem)} type="checkbox" className="ml-1"/>
                                </label>
                            </p>    
                            
                    )
                })}

            
    </div>
    )
}