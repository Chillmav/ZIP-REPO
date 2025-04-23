import FrameBox from "../Components/FrameBox"
import { frameList } from "../utils/frames.js"
import './../styles/RankingPage/RankingPage.css'
import priceTransform from "../utils/priceTransform.js"
export default function RankingPage() {
    return (
        <div
        className="frames-box"
        >  
            {frameList.map((item) => (
                <FrameBox
                    price = {priceTransform(item.price)}
                    img = {item.img}
                    name = {item.name}
                    material = {item.material}
                    color = {item.color}
                    mark = {item.mark}
                    key={item.id}
                />

            ))}
        </div>
    )
}   