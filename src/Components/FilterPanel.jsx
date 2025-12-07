import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function FilterPanel({ open, onClose, frames, onApply }) {
  const materials = [...new Set(frames.map(f => f.type))];
  const colors = [...new Set(frames.map(f => f.color))];
  const shapes = [...new Set(frames.map(f => f.shape))];
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (frames && frames.length > 0) {
      const timer = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timer);
    } else {
      setLoading(true);
    }
  }, [frames, open]);

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) setList(list.filter(i => i !== item));
    else setList([...list, item]);
  };

  const handleApply = () => {
    onApply({
      material: selectedMaterials,
      color: selectedColors,
      shape: selectedShapes,
      maxPrice
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-[350px] bg-white shadow-2xl z-50 p-6 overflow-y-auto custom-scrollbar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {loading ? (
              <div className="flex justify-center items-center h-full text-xl font-semibold text-gray-700">
                Loading...
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Filtry</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Materiał */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Materiał</h3>
                    <div className="flex flex-wrap gap-2">
                      {materials.map(m => (
                        <button
                          key={m}
                          onClick={() => toggleSelection(m, selectedMaterials, setSelectedMaterials)}
                          className={`px-3 py-1 border rounded-md cursor-pointer ${selectedMaterials.includes(m) ? 'bg-[#DDE5B6]' : 'hover:bg-[#DDE5B6]'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kolor */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Kolor</h3>
                    <div className="flex flex-wrap gap-2">
                      {colors.map(c => (
                        <button
                          key={c}
                          onClick={() => toggleSelection(c, selectedColors, setSelectedColors)}
                          className={`px-3 py-1 border rounded-md cursor-pointer ${selectedColors.includes(c) ? 'bg-[#DDE5B6]' : 'hover:bg-[#DDE5B6]'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kształt */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Kształt</h3>
                    <div className="flex flex-wrap gap-2">
                      {shapes.map(s => (
                        <button
                          key={s}
                          onClick={() => toggleSelection(s, selectedShapes, setSelectedShapes)}
                          className={`px-3 py-1 border rounded-md cursor-pointer ${selectedShapes.includes(s) ? 'bg-[#DDE5B6]' : 'hover:bg-[#DDE5B6]'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cena */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Cena maksymalna - {maxPrice} zł</h3>
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#DDE5B6] cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={handleApply}
                    className="w-full bg-[#DDE5B6] text-[#555B4F] py-2 rounded-md mt-6 cursor-pointer"
                  >
                    Zastosuj filtry
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
