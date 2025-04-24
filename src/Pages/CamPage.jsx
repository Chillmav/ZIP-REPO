import WebcamComponent from '../Components/WebcamComponent'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CamPage() {

  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(false);

  async function handleUpload() {

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,

    });
    const result = await res.json();
    console.log('Prediction result:', result)
    return result

  }

  useEffect(() => {

    const uploadAndSet = async () => {

      const result = await handleUpload();

      if (result) {
          console.log('done')
          setUploaded(true)
      }

    }
    uploadAndSet();

  }, [file])

  useEffect(() => {

    const fetchingFramesAndNavigating = async () => {

      const res = await fetch('http://localhost:3000/ranking');
      const data = await res.json();
      console.log(data)
      return data
    }
    if (uploaded) {
      const result = fetchingFramesAndNavigating()
      if (result) {
        setTimeout(() => {
          navigate('/ranking')
        }, 2000)
        
      }

    }
    
    
  }, [uploaded])

  return (
    <>
      <WebcamComponent
      setFile = {setFile}
       />
    </>
  )
}