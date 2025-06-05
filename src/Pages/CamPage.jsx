import WebcamComponent from '../Components/WebcamComponent'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CamPage({ setData, user }) {

  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  // const [uploaded, setUploaded] = useState(false);

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

  // useEffect(() => {

  //   const fetchingFramesAndNavigating = async () => {

  //     const res = await fetch('http://localhost:3000/ranking');
  //     const data = await res.json();
  //     setData(data);
  //     console.log(data)
  //     setUploaded(false)
  //     return data
  //   }
  //   if (uploaded) {
  //     const result = fetchingFramesAndNavigating()
  //     if (result) {
  //       setTimeout(() => {
  //         navigate('/ranking')
  //       }, 2000)
        
  //     }

  //   }
    
    
  // }, [uploaded])

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