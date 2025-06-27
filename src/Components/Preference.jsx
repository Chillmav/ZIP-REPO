import Stars from "./stars.jsx";
import './../styles/scroll.css';

export default function Preference( {preference, userPreferences, setUserPreferences, userImportances, setUserImportances, preferences} ) {


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
        <div className="flex flex-col space-y-2">
            <div className="flex ">
                <p className="text-[20px] font-bold">{featureMap[preference]}:</p>
                <Stars
                preference={preference}
                value={userImportances[preference]}
                setUserImportances={setUserImportances}
                /> 
                
            </div>

            <div className="scroll">

                {preferences[preference].map((elem, index) => {

                    return (
                            <p key={index} className="w-fit">
                                <label key={index}>
                                <input value={elem} onChange={() => changePreferences(elem)} checked={userPreferences[preference].includes(elem)} type="checkbox" className="mr-1"/>
                                </label>{elem} 
                            </p>    
                            
                    )
                })}

            </div>
            
    </div>
    )
}