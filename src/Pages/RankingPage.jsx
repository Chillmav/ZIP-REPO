import { useEffect, useState } from "react";
import FrameBox from "../Components/FrameBox";
import priceTransform from "../utils/priceTransform.js";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import FilterPanel from "../Components/FilterPanel.jsx";

export default function RankingPage({ data }) {
    
  const [frames, setFrames] = useState([]);
  const [filteredFrames, setFilteredFrames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const framesPerPage = 8;

  useEffect(() => {
    console.log("All: " + frames)
    console.log("Filtered: " + filteredFrames)
    
  }, [frames, filteredFrames])

  // Ładowanie danych
  useEffect(() => {
    const savedFrames = localStorage.getItem("framesData");
    if (savedFrames) {
      const parsed = JSON.parse(savedFrames);
      setFrames(parsed);
      setFilteredFrames(parsed);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (data?.recommendation && Array.isArray(data.recommendation)) {
      setFrames(data.recommendation);
      setFilteredFrames(data.recommendation);
      localStorage.setItem("framesData", JSON.stringify(data.recommendation));
      setLoading(false);
    }
  }, [data]);

  const totalPages = Math.ceil(filteredFrames.length / framesPerPage);
  const lastPostIndex = currentPage * framesPerPage;
  const firstPostIndex = lastPostIndex - framesPerPage;
  const currentFrames = filteredFrames.slice(firstPostIndex, lastPostIndex);

const applyFilters = ({ material, color, shape, maxPrice }) => {

  console.log("Applying filters:", { material, color, shape, maxPrice });
  
  let filtered = [...frames];
  console.log("Total frames before filtering:", filtered.length);

  if (material && material.length > 0) {
    filtered = filtered.filter(f => material.includes(f.type));
    console.log("After material filter:", filtered.length);
  }
  
  if (color && color.length > 0) {
    filtered = filtered.filter(f => color.includes(f.color));
    console.log("After color filter:", filtered.length);
  }
  
  if (shape && shape.length > 0) {
    filtered = filtered.filter(f => shape.includes(f.shape));
    console.log("After shape filter:", filtered.length);
  }
  
  if (maxPrice) {
    filtered = filtered.filter(f => f.price / 100 <= maxPrice);
    console.log("After price filter:", filtered.length);
  }

  console.log("Final filtered count:", filtered.length);
  setFilteredFrames(filtered);
  setCurrentPage(1);

};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-600 text-lg">
        Ładowanie rankingu...
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-col h-[80vh] overflow-auto custom-scrollbar px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
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
        </div>

        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <GoArrowLeft />
          </button>

          <span className="px-4 py-2 text-sm text-gray-600">
            Strona {currentPage} z {totalPages}
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

      <button
        onClick={() => setIsFilterOpen(true)}
        className="fixed top-1/2 right-4 -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded-full cursor-pointer text-lg shadow-lg z-40"
      >
        Filtruj
      </button>

      <FilterPanel
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        frames={frames}
        onApply={applyFilters} // <-- przekazujemy callback do aplikowania filtrów
      />
    </div>
  );
}
