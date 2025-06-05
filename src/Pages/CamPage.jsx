import WebcamComponent from '../Components/WebcamComponent'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CamPage({ setData, user }) {

  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  async function handleUpload() {

    if (!file) return;

    const formData = new FormData();
    formData.append('userInput', JSON.stringify(user));
    formData.append('photo', file)

    const res = await fetch('http://127.0.0.1:8000/user', {
      method: 'POST',
      body: formData,

    });

    const result = await res.json();

    return result
  }

  

  useEffect(() => {

    const uploadAndSet = async () => {

      const result = await handleUpload();

      if (result) {

          console.log('done')
          setData(result)
          navigate('/ranking')

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