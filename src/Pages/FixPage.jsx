import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import SelectInput from "../Components/SelectInput";
export default function FixPage( {setData, user, setUser} ) {

    const [selectedEyes, setSelectedEyes] = useState(user[2][0]);
    const [selectedFaces, setSelectedFaces] = useState(user[2][1]);
    const [selectedBrows, setSelectedBrows] = useState(user[2][2]);

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
        <div className="flex flex-col rounded-2xl backdrop-blur-[8px] backdrop-saturate-[180%] bg-[rgba(255, 255, 255, 0.1)] p-[10px] items-center justify-center">
            <div className="flex flex-row gap-[10px]">

                <div className="flex flex-col items-center justify-center text-[20px] gap-[8px]">
                    <p>Detekcja kształtu twarzy i rozstawu oczu:</p>
                    <img src="http://localhost:8000/public/face_shape.jpg" alt="Detected Face Shape" className="rounded-2xl border-[2px]"/>
                    <div className="flex flex-col justify-between items-center p-[30px] gap-[30px]">
                        <div>Wykryty rozstaw oczu: <span className="text-[red]">{eyes_dict[user[2][0]]}</span></div>

                            <div className="flex flex-row items-center gap-[10px]">   

                                <p>Ostatecznie: </p>
                                <SelectInput selected={selectedEyes} options={eyes_dict} setSelected={setSelectedEyes} />

                            </div>

                        <div>Wykryty kształt twarzy: <span className="text-[red]">{faces_dict[user[2][1]]}</span></div>

                            <div className="flex flex-row items-center gap-[10px]">   

                                <p>Ostatecznie: </p>
                                <SelectInput selected = {selectedFaces} options = {faces_dict} setSelected = {setSelectedFaces}/>

                            </div>
                        
                    </div>
                </div>
                
                <div className="flex flex-col items-center  text-[20px] gap-[8px]">
                    <p className="">Detekcja kształtu brwi:</p>
                    <img src="http://localhost:8000/public/brows_shape.jpg" alt="Detected Brows Shape" className="rounded-2xl border-[2px]"/>
                    <div className="flex flex-col justify-between p-[30px] gap-[30px] items-center">
                        <p>Wykryty kształt brwi: <span className="text-[red]">{brows_dict[user[2][2]]}</span></p>
                        <div className="flex flex-row items-center gap-[10px]">   

                                <p>Ostatecznie: </p>
                                <SelectInput selected = {selectedBrows} options = {brows_dict} setSelected = {setSelectedBrows}/>

                        </div>
                        
                        
                    </div>
                </div>
                

            </div>
            

            <button
                onClick={() => {
                    setUser(prev => {
                    const updated = [...prev];
                    updated[2] = [selectedEyes, selectedFaces, selectedBrows];
                    return updated;
                });
                    getRanking()
                    .then(data => {
                        setData(data);
                        navigate('/ranking');
                    });
                }}
                className='bg-[#078c9b] rounded-2xl w-[50%] m-auto mb-[20px] cursor-pointer text-[20px] p-[5px]'
            >
                    Potwierdź
            </button>

        </div>
    )
}