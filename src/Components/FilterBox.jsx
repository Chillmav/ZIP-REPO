import Filter from "../Components/Filter.jsx";

export default function FilterBox({
  filters,
  activeFilters,
  setActiveFilters,
  resetFilters,
  priceRange,
  setPriceRange,
}) {
  const keyList = Object.keys(filters);

  return (
    <div className="p-4 rounded-2xl ml-6 w-auto h-fit backdrop-blur-md bg-[rgba(0,0,0,0.3)] text-white shadow-lg flex flex-col gap-[20px]">
      <div className="text-white">
        <h3 className="font-semibold mb-5">Cena (PLN):</h3>

        <div className="relative h-6 mb-4">
            {/* Lewy suwak */}
            <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[0]}
                onChange={(e) => {
                const newMin = Math.min(+e.target.value, priceRange[1] - 10);
                setPriceRange([newMin, priceRange[1]]);
                }}
                className="range range-left"
            />

            {/* Prawy suwak */}
            <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => {
                const newMax = Math.max(+e.target.value, priceRange[0] + 10);
                setPriceRange([priceRange[0], newMax]);
                }}
                className="range range-right"
            />
            </div>


        <div className="flex justify-between text-sm">
          <span className="-mt-5">{priceRange[0]} PLN</span>
          <span className="-mt-5">{priceRange[1]} PLN</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {keyList.map((feature) => (
          <Filter
            key={feature}
            feature={feature}
            filters={filters}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        ))}
      </div>

      <button
        className="backdrop-blur-md bg-[rgba(0,0,0,0.3)] p-4 rounded-2xl cursor-pointer"
        onClick={resetFilters}
      >
        Wyczyść wszystkie
      </button>
    </div>
  );
}
