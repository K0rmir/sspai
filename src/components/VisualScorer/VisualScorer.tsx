import { FileInput, Stack, Text, Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { callVisionApi } from '@/Api/visionApi';
import { useCalculateScore } from '@/hooks/useCalculateScore';
// import classes from './Welcome.module.css';

export function VisualScorer() {
  const [image, setImage] = useState<File | null>(null)
  const [totalScore, setTotalScore] = useState<number>()
  const [opened, { open, close }] = useDisclosure(false);

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
    <Stack  align='center' mt={15}>
      <Text>Unsure of your score?</Text>
      <Text>Take a picture of your hand and let AI count it for you!</Text>
      <Button onClick={open}>
        Count Score
      </Button>

      <Modal title="Sea, Salt & Paper AI Scorer " opened={opened} onClose={close} centered>
        <Stack align='center'>
      <FileInput placeholder="Upload or Take an Image" leftSection={photoElement}  accept="image/png,image/jpeg" clearable value={image} onChange={setImage}/>

      <Text size='xl' fw={700}>{totalScore}</Text>
      </Stack>
      </Modal>

    
    
    


    </Stack>
  );
}
