import { useCallback, useRef } from 'react'
import Webcam from 'react-webcam'

export default function WebcamComponent ({ setFile }) {

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

    return (
        <>
            <Webcam
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            />
            
            <button
            onClick={capture}
            >
                Capture photo
            </button>
        </>
    )
}