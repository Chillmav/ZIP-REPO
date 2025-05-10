import { useState, useRef } from "react"
import axios from 'axios'
import { FaUpload } from "react-icons/fa";
export default function ImageUploader( { setPhoto, photo }) {

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
            className="w-full h-full bg-amber-200 cursor-pointer rounded-br-[5px] rounded-tr-[5px]"
            onClick={handleClick}>
                <FaUpload
                className="w-full h-full"
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