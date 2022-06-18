import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Text, Button } from "@chakra-ui/react";
import { useState } from "react";
const Dictaphone = () => {
  const [started, setStarted] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleListen = () => {
    if (started) {
      SpeechRecognition.stopListening();
      setStarted(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setStarted(true);
    }
  };

  return (
    <>
      <Text>Microphone: {listening ? "on" : "off"}</Text>
      <Button onClick={handleListen}>{started ? "Pause" : "Start"}</Button>
      <Text>{transcript}</Text>
    </>
  );
};
export default Dictaphone;
