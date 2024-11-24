import { FileInput } from '@mantine/core';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { callVisionApi } from '@/Api/visionApi';
// import classes from './Welcome.module.css';

export function VisualScorer() {
  const [image, setImage] = useState<File | null>(null)

  const photoElement = <FontAwesomeIcon icon={faImage}/>

  useEffect(() => {
    if (image) {
      callVisionApi(image)
      
    }
  }, [image]);

  return (
    <>
    <FileInput label="Upload an image" placeholder="to calculate your score" leftSection={photoElement}  accept="image/png,image/jpeg" clearable value={image} onChange={setImage}/>
    


    </>
  );
}
