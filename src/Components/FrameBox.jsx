import './../styles/FrameBox.css';

export default function FrameBox({ price, img, name, material, color, mark, shape, score }) {
    const percent = Math.floor(score * 100);

    let matchColor = 'bg-red-600';
    if (percent >= 70) matchColor = 'bg-green-600';
    else if (percent >= 30) matchColor = 'bg-orange-500';

    return (
            <div className="flex flex-col items-center justify-between border border-gray-300 rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-200 w-[260px] h-[340px] p-4">
                
                <div className="flex justify-center items-center w-full h-[180px] bg-gray-50 rounded-xl overflow-hidden mb-3">
                    <img
                        src={`src/public/${img}`}
                        alt={name}
                        className="object-contain w-full h-full"
                        onError={(e) => e.target.style.display = 'none'} 
                    />
                </div>

                <div className="flex flex-col items-center text-center flex-grow justify-between">
                    <div>
                        <p className="font-semibold text-[12px] leading-tight mb-2 max-w-[220px] line-clamp-2">
                            {name}
                        </p>
                        <p className={`text-white text-sm px-3 py-1 rounded-md ${matchColor} mb-3`}>
                            {percent}% zgodności
                        </p>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                        <p>Cena: {price}</p>
                        <p>Materiał: {material}</p>
                        <p>Kolor: {color}</p>
                        <p>Marka: {mark}</p>
                        <p>Kształt: {shape}</p>
                    </div>
                </div>
            </div>
    );
}
