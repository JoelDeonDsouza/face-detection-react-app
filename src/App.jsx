import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';

function App() {
  const imageRef = useRef();
  const canvasRef = useRef();

  const handleImg = async () => {
    const faceDetection = await faceapi.detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imageRef.current);
    faceapi.matchDimensions(canvasRef.current, {
      width:710,
      height:500
    })
    const resized = faceapi.resizeResults(faceDetection, {
      width:710,
      height:500
    } )
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
  }
  useEffect(() => {
     const modelLog = () => {
       Promise.all([
         faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
         faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
         faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
         faceapi.nets.faceExpressionNet.loadFromUri("/models")
       ]).then(handleImg).catch((error) => console.log(error))
     }
     imageRef.current && modelLog();
  }, [])
  return (
    <div className="App">
      <img crossOrigin="anonymous" ref={imageRef} src="https://media.istockphoto.com/id/1368965646/photo/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.jpg?s=170667a&w=0&k=20&c=Xwg_xkNp3mEBup6Khthbu4x6qW-tdRufcs1JSptWXxU=" alt="profile" width="710" height="500"/>
      <canvas ref={canvasRef}  width="710" height="500" />
    </div>
  );
}

export default App;
