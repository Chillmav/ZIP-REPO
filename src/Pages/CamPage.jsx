import WebcamComponent from '../Components/WebcamComponent';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CamPage({ setData, setUser }) {

  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    const res = await fetch('http://localhost:8000/fixing', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    return result;
  }

  useEffect(() => {
    const uploadAndSet = async () => {
      if (!file) return;

      try {
        const result = await handleUpload();

        if (result) {
          setUser(prev => [...prev, result]);
          navigate('/fixing');
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    };
    uploadAndSet();
  }, [file]);

  return (
    <>
      <WebcamComponent
        setFile={setFile}
        setPhoto={setPhoto}
        photo={photo}
      />

      {/* Modal błędu */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* półprzezroczyste tło */}
          <div 
            className="absolute inset-0 backdrop-blur-sm"
            onClick={() => setError(false)}
          />
          
          {/* okno modalne */}
          <div className="relative bg-white rounded-2xl shadow-lg p-6 w-[30vw] max-w-md flex flex-col items-center z-50">
            <p className="text-center mb-4">
              Nie udało się dodać zdjęcia, spróbuj ponownie.
            </p>
            <button
              onClick={() => setError(false)}
              className="bg-[#DDE5B6] text-[#555B4F] py-2 px-4 rounded-md cursor-pointer hover:bg-[#c9d3a1]"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}

    </>
  );
}
