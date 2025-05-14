import { useRef } from "react"
import { FaUpload } from "react-icons/fa";
export default function ImageUploader( { setPhoto }) {

    const photoInputRef = useRef(null);

    function handleClick() {
        
        photoInputRef.current.click();

    }
    
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) setPhoto(file);
    }

    return (
        <div
        className="object-cover"
        >
            <button
            className="w-full h-full backdrop-blur-[16px] backdrop-saturate-[180%] bg-[rgba(255,255,255,0.4)] cursor-pointer rounded-br-[5px] rounded-tr-[5px] border-[1px]"
            onClick={handleClick}>
                <FaUpload
                className="w-[50px] h-100% "
                 />
            </button>

            <input
            type="file"
            ref={photoInputRef}
            onChange={handleFileChange}
            className="hidden"
            />
        </div>
    )
}