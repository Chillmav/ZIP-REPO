import FrameBox from "../Components/FrameBox"
import './../styles/RankingPage/RankingPage.css'
import priceTransform from "../utils/priceTransform.js"
export default function RankingPage({ data }) {
    console.log(data)
    return (
        <div
        className="frames-box"
        >  
            {data.map((item) => (
                <FrameBox
                    price = {priceTransform(item.price)}
                    img = {item.img}
                    name = {item.name}
                    material = {item.material}
                    color = {item.color}
                    mark = {item.mark}
                    key={item._id}
                />
                
            ))}
            
        </div>
    )
}   