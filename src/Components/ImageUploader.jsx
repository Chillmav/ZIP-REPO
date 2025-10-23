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
            className="backdrop-blur-[16px] backdrop-saturate-[180%] bg-[#F7F6F3] cursor-pointer rounded-br-[5px] rounded-tr-[5px] border-r-[1px] border-y-[1px]"
            onClick={handleClick}>
                <FaUpload
                className="w-[5vw] h-10 p-2 m-2"
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