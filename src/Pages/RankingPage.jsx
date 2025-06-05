import FrameBox from "../Components/FrameBox"
import priceTransform from "../utils/priceTransform.js"

export default function RankingPage({ data }) {

    const { recommendation } = data
    return (
        <div
        className="flex flex-col rounded-2xl h-[650px] overflow-auto border-[2px] p-[10px] border-[rgb(146,146,146)] space-y-2 w-[1000px] -mt-[100px]"
        >  
            {recommendation.map((item) => (
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