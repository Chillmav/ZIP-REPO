import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import SelectInput from "../Components/SelectInput";
export default function FixPage( {setData, user, setUser} ) {

    const [selectedEyes, setSelectedEyes] = useState(user[2][0]); // user[2][0]
    const [selectedFaces, setSelectedFaces] = useState(user[2][1]); // user[2][1]
    const [selectedBrows, setSelectedBrows] = useState(user[2][2]); // user[2][2]

    const handleConfirm = () => {
        const updatedUser = [...user];
        updatedUser[2] = [selectedEyes, selectedFaces, selectedBrows];
        setUser(updatedUser);

        getRanking()
        .then(data => {
            setData(data);
            navigate('/ranking');
        });
    };

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
        <div className="flex flex-col rounded-2xl bg-[#DDE5B6] items-center justify-center m-4 p-6 shadow-md">
            <div className="flex flex-row space-x-10">

                <div className="flex flex-col items-center justify-center text-[20px] gap-y-6 text-[#555B4F]">
                    <p className="text-[20px] text-[#2E2E2E] font-semibold">Detekcja kształtu twarzy i rozstawu oczu</p>
                    <div className="flex flex-row space-x-8">
                    <div>Wykryty rozstaw oczu: <span className="text-[red] font-semibold">{eyes_dict[user[2][0]]}</span></div>
                    <div>Wykryty kształt twarzy: <span className="text-[red] font-semibold">{faces_dict[user[2][1]]}</span></div>
                    </div>
                    <img
                        src="http://localhost:8000/public/face_shape.jpg"
                        alt="Detected Face Shape"
                        className="rounded-2xl border-[2px] max-w-[30vw] max-h-[40vh] border-[#A5A58D] shadow-md object-contain"
                    />

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
                    <p>Wykryty kształt brwi: <span className="text-[red] font-semibold">{brows_dict[user[2][2]]}</span></p>
                    <img src="http://localhost:8000/public/brows_shape.jpg" 
                    alt="Detected Brows Shape" 
                    className="rounded-2xl border-[2px] max-w-[30vw] max-h-[40vh] border-[#A5A58D] shadow-md object-contain"/>

                
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
        onClick={handleConfirm}
        className='bg-[#DDE5B6] rounded-2xl w-[50%] m-auto mb-[20px] cursor-pointer text-[20px] p-[5px]'
        >
        Potwierdź
        </button>

            </div>
    )
}