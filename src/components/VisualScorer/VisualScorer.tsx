import { FileInput } from '@mantine/core';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { callVisionApi } from '@/Api/visionApi';
import { Prediction } from '@/interfaces/interfaces';
import { useCalculateScore } from '@/hooks/useCalculateScore';
// import classes from './Welcome.module.css';

export function VisualScorer() {
  const [image, setImage] = useState<File | null>(null)
  const [predictionData, setPredictionData] = useState<Prediction[]>()

  const photoElement = <FontAwesomeIcon icon={faImage}/>

  useEffect(() => {
    const fetchPredictionData = async () => {
      if (image) {
        try {
          const data = await callVisionApi(image);
          setPredictionData(data)
        } catch(error) {
          console.error("Error fetching prediction data:", error)
        }
      }
    };
    fetchPredictionData();
  }, [image])

  useEffect(() => {
    if (predictionData) {
      useCalculateScore(predictionData)
    }
  }, [predictionData])

  console.log("Data =", predictionData)
    

  return (
    <>
    <FileInput label="Upload an image" placeholder="to calculate your score" leftSection={photoElement}  accept="image/png,image/jpeg" clearable value={image} onChange={setImage}/>
    


    </>
  );
}
