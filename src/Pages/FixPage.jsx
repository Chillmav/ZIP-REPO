import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import SelectInput from "../Components/SelectInput";
export default function FixPage( {setData, user, setUser} ) {

    const [selectedEyes, setSelectedEyes] = useState("wide"); // user[2][0]
    const [selectedFaces, setSelectedFaces] = useState("round"); // user[2][1]
    const [selectedBrows, setSelectedBrows] = useState("round"); // user[2][2]

    console.log(user);
    const navigate = useNavigate();

    const eyes_dict = {
        "wide": "Szeroki",
        "narrow": "Wąski",
        "balanced": "Zrównoważony"
    }

    const brows_dict = {
        'round': "Zaokrąglone",
        'high_arch': "Wysoko wygięte",
        'straight': "Proste"
    }

    const faces_dict = {
        "heart": "Serce",
        "oblong": "Podłużna",
        "oval": "Owalna",
        "round": "Okrągła",
        "square": "Kwadratowa"
    }
    
    async function getRanking() {


        const res = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        });

        const result = await res.json();

        return result

    }


    return (
        <div className="flex flex-col rounded-2xl">
        <div className="flex flex-col rounded-2xl bg-[#DDE5B6] items-center justify-center m-4 p-6 h-[72vh] shadow-md">
            <div className="flex flex-row space-x-10">

                <div className="flex flex-col items-center justify-center text-[20px] gap-y-6 text-[#555B4F]">
                    <p className="text-[20px] text-[#2E2E2E] font-semibold">Detekcja kształtu twarzy i rozstawu oczu</p>
                    <div className="flex flex-row space-x-8">
                    <div>Wykryty rozstaw oczu: <span className="text-[red] font-semibold">{eyes_dict["wide"]}</span></div>
                    <div>Wykryty kształt twarzy: <span className="text-[red] font-semibold">{faces_dict["round"]}</span></div>
                    </div>
                    <img src="http://localhost:8000/public/face_shape.jpg" alt="Detected Face Shape" className="rounded-2xl border-[2px] w-[30vw] border-[#A5A58D] shadow-md"/>
                    <div className="flex flex-row items-center justify-between space-x-8">

                            <div className="flex flex-row items-center justify-center space-x-2">   

                                <p>Ostatecznie: </p>
                                <SelectInput selected={selectedEyes} options={eyes_dict} setSelected={setSelectedEyes} />

                            </div>


                            <div className="flex flex-row items-center justify-center space-x-2">   

                                <p>Ostatecznie: </p>
                                <SelectInput selected = {selectedFaces} options = {faces_dict} setSelected = {setSelectedFaces}/>

                            </div>
                        
                    </div>
                </div>
                
                <div className="flex flex-col items-center text-[20px] gap-y-6 text-[#555B4F]">
                    <p className="text-[20px] text-[#2E2E2E] font-semibold">Detekcja kształtu brwi</p>
                    <p>Wykryty kształt brwi: <span className="text-[red] font-semibold">{brows_dict["round"]}</span></p>
                    <img src="http://localhost:8000/public/brows_shape.jpg" alt="Detected Brows Shape" className="rounded-2xl border-[2px] w-[30vw] border-[#A5A58D] shadow-md"/>
                    <div className="flex flex-col justify-between items-center">
                        {/* <p>Wykryty kształt brwi: <span className="text-[red]">{brows_dict["round"]}</span></p> */}
                        <div className="flex flex-row items-center space-x-2">   

                                <p>Ostatecznie: </p>
                                <SelectInput selected = {selectedBrows} options = {brows_dict} setSelected = {setSelectedBrows}/>

                        </div>
                        
                        
                    </div>
                </div>
                

            </div>

        </div>

        <button
            
                onClick={() => {
                    getRanking()
                    .then(data => {
                        setData(data);
                        navigate('/ranking');
                    });

                }}
                className='bg-[#DDE5B6] rounded-2xl w-[50%] m-auto mb-[20px] cursor-pointer text-[20px] p-[5px]'
            >
                    Potwierdź

            </button>
            </div>
    )
}