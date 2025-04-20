import './App.css'
import WebcamComponent from './Components/WebcamComponent'
import { useEffect, useState } from 'react'
function App() {
  const [file, setFile] = useState(null);
  
  async function handleUpload() {

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:3000/uploads', {
      method: 'POST',
      body: formData,

    });
    const result = await res.json();
    console.log('Prediction result:', result)
  }

  useEffect(() => {

    handleUpload()
    
    console.log('done')

  }, [file])

  return (
    <>
      <WebcamComponent
      setFile = {setFile}
       />
    </>
  )
}

export default App
