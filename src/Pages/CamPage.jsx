import WebcamComponent from '../Components/WebcamComponent'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CamPage({ setData, setUser }) {

  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  async function handleUpload() {

    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file)

    const res = await fetch('http://localhost:8000/fixing', {

      method: 'POST',
      body: formData

    });   

    const result = await res.json();

    return result

  }

  

  useEffect(() => {

    const uploadAndSet = async () => {

      const result = await handleUpload();

      if (result) {

          console.log('done')
          setUser(prev => [...prev, result]);
          navigate('/fixing')

      }

    }
      uploadAndSet();

  }, [file])

  return (
    <>
    
      <WebcamComponent
      setFile = {setFile}
      setPhoto = {setPhoto}
      photo = {photo}
       />

    </>
  )
}