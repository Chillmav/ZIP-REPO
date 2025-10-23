export default function Filter({ feature, filters, activeFilters, setActiveFilters }) {

    const options = filters[feature];

    const selected = activeFilters[feature] || [];

    const featureMap = {
        "Shape": "Kształt",
        "Color": "Kolor",
        "Type": "Materiał",
        "Mark": "Marka"

    }
    const handleChange = (option) => {
        
        const isSelected = selected.includes(option);
        const updated = isSelected
            ? selected.filter((val) => val !== option)
            : [...selected, option];

        setActiveFilters((prev) => ({
            ...prev,
            [feature]: updated,
        }));

    };
    
    return (
        <div>
            <h3 className="font-semibold mb-1 capitalize text-white">{featureMap[feature]}: </h3>
            <div className="grid grid-cols-4 gap-2">
                {options.map((option, index) => (
                    <label
                        key={index}
                        className="flex items-center space-x-1 text-sm text-white"
                    >
                        <input
                            type="checkbox"
                            name={`${feature}-${option}`}
                            checked={selected.includes(option)}
                            onChange={() => handleChange(option)}
                            className="accent-blue-500"
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
