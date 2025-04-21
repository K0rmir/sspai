import { PlayerInfo } from '@/interfaces/interfaces';
import { FileInput, Stack, Text, Modal, Button, Select, LoadingOverlay, ModalOverlay} from '@mantine/core';
import { useState, useEffect, useCallback, FC, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { callVisionApi } from '@/Api/visionApi';
import { calculateScore } from '@/hooks/calculateScore';
import {gameStore} from "@/store/GameStore"

type VisualScorerModalProps = {
  playerInfo: PlayerInfo,
  setPredictedScoreInStore: (key: string, score: number) => void,
  isModalOpen: boolean,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const VisualScorerModal: FC<VisualScorerModalProps> = ({isModalOpen, playerInfo, setIsModalOpen, setPredictedScoreInStore}) => {

  const [image, setImage] = useState<File | null>(null)
  const photoElement = <FontAwesomeIcon icon={faImage}/>
  const [predictedScore, setPredictedScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string | null>(null)

  const fetchPredictionData = useCallback( async () => {
    if (image !== null) {
      setIsLoading(true)
      try {
        const data = await callVisionApi(image)
        setPredictedScore(calculateScore(data))   
        setIsLoading(false)
        
      } catch(error) {
        console.error("Error fetching prediction data:", error)
        setIsLoading(false)
      }
    }
  }, [image])
  
    useEffect(() => {
      if (image === null) {
        setPredictedScore(null)
      } else {
        fetchPredictionData();
      }
    }, [image])
  
  
    function updatePredictedScore() {
      if (value && predictedScore !== null) {
        setPredictedScoreInStore(value, predictedScore)
      }
      setImage(null)
      setValue(null)
      setPredictedScore(null)
      setIsModalOpen(false)
    }
  
    function handleModalClose() {
      setIsModalOpen(false)
      setPredictedScore(null)
      setImage(null)
      setValue(null)
    }

  return (
<Modal.Root opened={isModalOpen} onClose={handleModalClose} styles={{content: { width: "25vw", height: "37vh"}}} centered>
  <ModalOverlay backgroundOpacity={0.55} blur={1.5} />
    <Modal.Content pos="relative">
    <LoadingOverlay 
      visible={isLoading} 
    />
      <Modal.Header>
        <Modal.Title>Sea, Salt & Paper AI Scorer</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
      <Stack align='center'>
<FileInput placeholder="Upload or take an image" leftSection={photoElement}  accept="image/png,image/jpeg" clearable value={image} onChange={setImage}/>
  {predictedScore && (
    <Stack align='center'>
      <Text size='xl' fw={700}>This hand is worth: {predictedScore} points</Text>
      <Text>Who's score is this?</Text>
      <Select placeholder='Pick a player' data={Object.entries(playerInfo).map(([key, player]) => ({
        label: player.name ?? "",
        value: key 
        }))} 
        value={value ?? null} onChange={(_value, option) => setValue(option.value)} />
      <Button onClick={() => updatePredictedScore()}>Update</Button>
    </Stack>
    )}
</Stack>
      </Modal.Body>
    </Modal.Content>
</Modal.Root>

  )
}

const VisualScorer: FC = () => {
  const { playerInfo, setPredictedScoreInStore} = gameStore()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      {/* <Text>Unsure of your score?</Text> */}
      {/* <Text>Take a picture of your hand and let AI count it for you!</Text> */}
      <Button onClick={() => setIsModalOpen(true)}>
        Count Score
      </Button>
      <VisualScorerModal isModalOpen={isModalOpen} playerInfo={playerInfo} setIsModalOpen={setIsModalOpen} setPredictedScoreInStore={setPredictedScoreInStore} /> 
    </>
  );
}

export default VisualScorer


