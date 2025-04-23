import './../styles/RankingPage/FrameBox.css'

export default function FrameBox({ price, img, name, material, color, mark }) {
    return (
        <div
        className="framebox-flex"
        >
            <div>
                <img src={`./../backend/images/${img}`} className='frame-img'/>
            </div>

            <div>
                <p className='name'>{name}</p>
                <p className='price'>Price: {price}</p>
                <p className='info'>Material: {material}</p>
                <p className='info'>Color: {color}</p>
                <p className='info'>Mark: {mark}</p>
            </div>
        </div>
    )
}