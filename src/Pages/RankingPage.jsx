import { useEffect, useState } from "react";
import FrameBox from "../Components/FrameBox";
import priceTransform from "../utils/priceTransform.js";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import FilterBox from "../Components/FilterBox.jsx";

export default function RankingPage({ data }) {

    const [frames, setFrames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const framesPerPage = 10;

    console.log(frames)

    const totalPages = Math.ceil(frames.length / framesPerPage);
    const lastPostIndex = currentPage * framesPerPage;
    const firstPostIndex = lastPostIndex - framesPerPage;
    const currentFrames = frames.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
    const storedFrames = localStorage.getItem("frames");
    if (storedFrames) {
        setFrames(JSON.parse(storedFrames));
    }
    }, []);

    useEffect(() => {
    if (data?.recommendation && data.recommendation.length > 0) {
        setFrames(data.recommendation);
        localStorage.setItem("frames", JSON.stringify(data.recommendation));
    }
    }, [data]);

    return (
        <div className="flex flex-row h-[80vh] overflow-auto custom-scrollbar pr-6">
            <div className="flex flex-col rounded-2xl h-auto p-[10px] space-y-2 w-[1000px] mb-[200px]">
                {currentFrames.map((item) => (
                    <FrameBox
                        key={item._id}
                        price={priceTransform(item.price)}
                        img={item.img}
                        name={item.name.replace(/\d+/g, '')}
                        material={item.type}
                        color={item.color}
                        mark={item.mark}
                        shape={item.shape}
                        score={item.score}
                    />
                ))}

                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        <GoArrowLeft />
                    </button>

                    <span className="px-4 py-2 text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        <GoArrowRight />
                    </button>
                </div>

            </div>
        
        </div>
    );
}

