import { FileInput } from '@mantine/core';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { callVisionApi } from '@/Api/visionApi';
import { Prediction } from '@/interfaces/interfaces';
import { useCalculateScore } from '@/hooks/useCalculateScore';
// import classes from './Welcome.module.css';

export function VisualScorer() {
  const [image, setImage] = useState<File | null>(null)
  const [totalScore, setTotalScore] = useState<number>()

  const photoElement = <FontAwesomeIcon icon={faImage}/>

const fetchPredictionData = useCallback( async () => {
  if (image) {
    try {
      const data = await callVisionApi(image)
      setTotalScore(() => useCalculateScore(data))
    } catch(error) {
      console.error("Error fetching prediction data:", error)
    }
  }
}, [image])

  useEffect(() => {
    fetchPredictionData();
  }, [image])
    

  return (
    <>
    <FileInput label="Upload an image" placeholder="to calculate your score" leftSection={photoElement}  accept="image/png,image/jpeg" clearable value={image} onChange={setImage}/>
    


    </>
  );
}
