import { useEffect, useState, useMemo } from "react";
import FrameBox from "../Components/FrameBox";
import priceTransform from "../utils/priceTransform.js";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import FilterBox from "../Components/FilterBox.jsx";

export default function RankingPage({ data, user }) {

    const [filters, setFilters] = useState();
    const [activeFilters, setActiveFilters] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 1000]);

    const { recommendation } = data;

    const [currentPage, setCurrentPage] = useState(1);
    const framesPerPage = 10;

    const resetFilters = () => {
    if (!filters) return;
    const reset = {};
    for (const key in filters) {
        reset[key] = [];
    }
    setActiveFilters(reset);
    setPriceRange([0, 1000]); 
};
    const keyMap = {
        Shape: 'shape',
        Color: 'color',
        Type: 'type',
        Mark: 'mark',
    };

    console.log(recommendation)
    const filteredFrames = useMemo(() => {

        if (!activeFilters) return recommendation;

        return recommendation.filter(frame => {
            const priceInPLN = frame.price / 100;
            if (priceInPLN < priceRange[0] || priceInPLN > priceRange[1]) {
                return false;
            }

            for (const key in activeFilters) {
                if (activeFilters[key].length === 0) continue;

                const frameKey = keyMap[key];
                const frameValue = frame[frameKey];

                if (!activeFilters[key].includes(frameValue)) {
                    return false;
                }
            }

            return true;
        });

    }, [recommendation, activeFilters, priceRange]);


    const totalPages = Math.ceil(filteredFrames.length / framesPerPage);
    const lastPostIndex = currentPage * framesPerPage;
    const firstPostIndex = lastPostIndex - framesPerPage;
    const currentFrames = filteredFrames.slice(firstPostIndex, lastPostIndex);

useEffect(() => {
  fetch('http://localhost:8000/frames')
    .then(res => res.json())
    .then(data => {
      setFilters(data);

      const initialActiveFilters = {};
      for (const key in data) {
        initialActiveFilters[key] = []; 
      }

      setActiveFilters(initialActiveFilters);
    });
}, []);


    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilters]);

    return (
        <div className="flex flex-row">
            <div className="flex flex-col rounded-2xl h-auto border-[2px] p-[10px] border-[rgb(146,146,146)] space-y-2 w-[1000px] mb-[200px] backdrop-blur-[8px] backdrop-saturate-[200%] bg-[rgba(255, 255, 255, 0.8)]">
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
            {filters ? <FilterBox filters={filters} activeFilters={activeFilters} setActiveFilters={setActiveFilters} resetFilters = {resetFilters} priceRange={priceRange} setPriceRange={setPriceRange}/> : <></>}
        </div>
    );
}

