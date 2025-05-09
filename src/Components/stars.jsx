import ReactStars from 'react-stars'


export default function Stars({value, setUserImportances, preference}) {

    function changeImportance(value) {
        setUserImportances((prev) => ({
            ...prev,
            [preference]: value
        }))
    }
    return (
        <ReactStars
        count={5}
        size={20}
        className='ml-[10px]'
        value={value}
        onChange={(newValue) => changeImportance(newValue)}
        />
    )
}