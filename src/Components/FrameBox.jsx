import './../styles/FrameBox.css'

export default function FrameBox({ price, img, name, material, color, mark, shape, score }) {

    const percent = Math.floor(score * 100) - 20;
    
    // Ustal kolor na podstawie wartości percent
    let matchColor = 'bg-red-600';
    if (percent >= 70) {
        matchColor = 'bg-green-600';
    } else if (percent >= 30) {
        matchColor = 'bg-orange-500';
    }

    return (
        <div className="flex border-solid border-[3px] rounded-[10px] border-[rgb(146,146,146)] w-auto relative">
            <div className='flex items-center justify-center min-w-[300px] min-h-[200px] rounded-2xl'>
                <img src={`src\\public\\${img}`} className='rounded-2xl w-[240px] h-[160px] align-middle justify-center'/>
            </div>

            <div className='mt-3 flex flex-row mb-4'>
                <div>
                    <div className='flex flex-row gap-[10px] items-center justify-center mb-[10px]'>
                        <p className='name'>{name}</p>
                        <p className={` backdrop-blur-md p-[10px] z-100 text-white rounded-md ${matchColor}`}>{percent}% zgodności</p>
                    </div>
                    <p className='price'>Cena: {price}</p>
                    <p className='info'>Materiał: {material}</p>
                    <p className='info'>Kolor: {color}</p>
                    <p className='info'>Marka: {mark}</p>
                    <p className='info'>Kształt: {shape}</p>
                </div>

            </div>
        </div>
    )
}
