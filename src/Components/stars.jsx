import ReactStars from 'react-stars'


export default function Stars({value, setUserImportances}) {
    return (
        <ReactStars
        count={5}
        size={20}
        className='ml-[10px]'
        value={value}
        onChange={(event) => {
            setUserImportances(Number(event.target.value))
        }}
        />
    )
}