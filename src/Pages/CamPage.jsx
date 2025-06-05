import WebcamComponent from '../Components/WebcamComponent'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CamPage({ setData, name }) {

  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(false);
  
  async function handleUpload() {

    if (!file) return;

    const formData = new FormData();
    formData.append('userData', JSON.stringify(name));
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
  if (!file) return;

  const uploadAndRecommend = async () => {

    // 1. Upload

    const uploadResult = await handleUpload();
    if (!uploadResult) return;

    // 2. Call recommend endpoint

    const res = await fetch('http://localhost:3000/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        preferences: uploadResult.userData
      }),
    });

    const recommendations = await res.json();
    setData(recommendations);
    navigate('/ranking');
  };

  uploadAndRecommend();

}, [file]);

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