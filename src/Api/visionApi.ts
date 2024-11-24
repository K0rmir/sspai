import { Prediction } from "@/interfaces/interfaces"

export const callVisionApi = async (image: File) => {
    const endpointUrl = "https://ssp-prediction-resource.cognitiveservices.azure.com/customvision/v3.0/Prediction/4ca4620b-735b-42cc-9d0a-8e60ac727687/detect/iterations/Iteration2/image"
    const predictionKey = import.meta.env.VITE_PREDICTION_KEY

    if (!predictionKey) {
        throw new Error("Prediction Key is missing. Check .env file")
    }

    const headers = {
        "Prediction-Key": predictionKey,
        "Content-Type": "application/octet-stream",
    }

    try {
        const response = await fetch(endpointUrl, {
            method: "POST",
            headers,
            body: image
        });

        if (!response.ok) {
            const errorMessage = `Error: ${response.status} - ${response.statusText}`
            console.error(errorMessage)
            return errorMessage
        }

        const data = await response.json();
        const predictions = data.predictions.filter((prediction: Prediction) => prediction.probability >= 0.90)
        console.log("Data =", predictions)
        return predictions

    } catch (error) {
        console.error("Request Failed:", error)
        return null;
    }





}