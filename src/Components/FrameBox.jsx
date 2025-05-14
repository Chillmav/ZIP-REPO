import './../styles/FrameBox.css'

export default function FrameBox({ price, img, name, material, color, mark }) {
    return (
        <div
        className="flex border-solid border-[3px] rounded-[10px] border-[rgb(146,146,146)] w-auto"
        >
            <div className='flex items-center justify-center min-w-[300px] min-h-[200px] rounded-2xl'>
                <img src={`./../backend/zdjecia_oprawek/${img}`} className='rounded-2xl w-[240px] h-[160px] align-middle justify-center'/>
            </div>

            <div className='mt-3'>
                <p className='name'>{name}</p>
                <p className='price'>Price: {price}</p>
                <p className='info'>Material: {material}</p>
                <p className='info'>Color: {color}</p>
                <p className='info'>Mark: {mark}</p>
            </div>
        </div>
    )
}