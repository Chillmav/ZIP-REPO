import { useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
import ImageUploader from './ImageUploader.jsx';

export default function WebcamComponent ({ setFile, setPhoto, photo }) {

    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        const byteString = atob(imageSrc.split(',')[1]);
        const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });

        const file = new File([blob], "webcam.jpg", { type: mimeString });
        setFile(file);
    }, [webcamRef]);

    function addPhoto() {

        if (!photo) return;

        setFile(photo);
        
    }

    return (
        <div className='flex flex-col bg-[#DDE5B6] p-5 rounded-2xl shadow-md w-[50vw] m-4'>

            <Webcam
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            className='rounded-xl m-5'
            />
            
            <div className='flex justify-between space-x-5 mx-5'>
                <button
                onClick={capture}
                className='w-[20vw] rounded-[5px] border-[1px] py-[10px] px-[5px] 
                                text-[#555B4F]  
                                bg-[#F7F6F3] cursor-pointer transition duration-300 
                                hover:bg-gray-50"'
                >

                    Zrób zdjęcie
                    
                </button>
                <div className="flex">
                    <button
                        onClick={addPhoto}
                        className="w-[15vw] rounded-l-[5px] border-[1px] py-[10px] px-[5px] 
                                text-[#555B4F]  
                                bg-[#F7F6F3] cursor-pointer transition duration-300 
                                hover:bg-gray-50"
                    >
                        Dodaj zdjęcie
                    </button>

                    <ImageUploader
                        photo={photo}
                        setPhoto={setPhoto}
                        setFile={setFile}
                    />
                    </div>

            </div>
        </div>
    )
}