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
        <div className='flex flex-col backdrop-blur-[16px] backdrop-saturate-[180%] bg-[rgba(17,25,40,0.10)] rounded-2xl p-6 space-y-[40px]'>

            <Webcam
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            className='rounded-2xl'
            />
            
            <div className='flex justify-between space-x-5'>
                <button
                onClick={capture}
                className='w-[300px] rounded-[5px] border-[1px] py-[10px] px-[5px] text-black backdrop-blur-[16px] backdrop-saturate-[180%] bg-[rgba(255,255,255,0.4)] cursor-pointer transition-bg-0.3s hover:bg-[rgba(255,255,255,0.6)]'
                >

                    Capture photo
                    
                </button>
                <div className='flex'>

                    <button
                    className='w-[300px] rounded-br-none rounded-tr-none rounded-[5px] border-[1px] py-[10px] px-[5px] text-black backdrop-blur-[16px] backdrop-saturate-[180%] bg-[rgba(255,255,255,0.4)] cursor-pointer transition-bg-0.3s hover:bg-[rgba(255,255,255,0.6)]'
                    onClick={addPhoto}
                    >
                        Add photo
                    </button>
                    <ImageUploader
                    photo = {photo}
                    setPhoto = {setPhoto}
                    setFile={setFile}
                    />

                </div>

            </div>
        </div>
    )
}