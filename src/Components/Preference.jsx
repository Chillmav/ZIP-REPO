export default function Preference( {name} ) {

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex">
                <p className="text-[20px] font-bold">{name}</p>

            </div>

            <select id="choices" name="choices">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
    </div>
    )
}