import { PlayerInfo } from '@/interfaces/interfaces';
import { FileInput, Stack, Text, Modal, Button, Select } from '@mantine/core';
import { useState, useEffect, useCallback, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { callVisionApi } from '@/Api/visionApi';
import { useCalculateScore } from '@/hooks/useCalculateScore';

type VisualScorerProps = {
  playerInfo: PlayerInfo,
  updatePlayerScoreField: (playerKey: string, predicatedScore: number) => void,
}

const VisualScorer: FC<VisualScorerProps> = ({playerInfo, updatePlayerScoreField}) => {
  const [image, setImage] = useState<File | null>(null)
  const [predictedScore, setPredictedScore] = useState<number>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string | null>(null)
  const photoElement = <FontAwesomeIcon icon={faImage}/>

const fetchPredictionData = useCallback( async () => {
  if (image) {
    try {
      const data = await callVisionApi(image)
      setPredictedScore(() => useCalculateScore(data))
    } catch(error) {
      console.error("Error fetching prediction data:", error)
    }
  }
}, [image])

  useEffect(() => {
    fetchPredictionData();
  }, [image])

  function updatePredictedScore() {
    if (value && predictedScore) {
      updatePlayerScoreField(value, predictedScore)
    }
    setIsModalOpen(false)
  }

  return (
    <Stack  align='center' mt={15}>
      <Text>Unsure of your score?</Text>
      <Text>Take a picture of your hand and let AI count it for you!</Text>
      <Button onClick={() => setIsModalOpen(true)}>
        Count Score
      </Button>

      <Modal title="Sea, Salt & Paper AI Scorer " opened={isModalOpen} onClose={() => setIsModalOpen(false)} centered>
        <Stack align='center'>
      <FileInput placeholder="Upload or take an image" leftSection={photoElement}  accept="image/png,image/jpeg" clearable value={image} onChange={setImage}/>

      {predictedScore && (
        <Stack align='center'>
          <Text size='xl' fw={700}>This hand is worth: {predictedScore} points</Text>
          <Text>Who's score is this?</Text>
          <Select placeholder='Pick a player' data={Object.entries(playerInfo).map(([key, player]) => ({
            label: player.name,
            value: key 
            }))} 
            value={value ? value : null} onChange={(_value, option) => setValue(option.value)} />
          <Button onClick={() => updatePredictedScore()}>Update</Button>
        </Stack>
      )}
      </Stack>
      </Modal>
</Stack>
  );
}

export default VisualScorer
