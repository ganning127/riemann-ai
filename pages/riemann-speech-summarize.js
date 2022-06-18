import { SideBar } from "../components/SideBar.jsx";
import Head from "next/head";
import { Landing } from "../components/Landing";
import {
  Select,
  Heading,
  Text,
  Box,
  Link,
  Button,
  HStack,
  Icon,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { HeadingWithDesc } from "../components/Headings/HeadingWithDesc.jsx";
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const languages = {
  Afrikaans: "af",
  Basque: "eu",
  Bulgarian: "bg",
  Catalan: "ca",
  "Arabic (Egypt)": "ar-EG",
  "Arabic (Jordan)": "ar-JO",
  "Arabic (Kuwait)": "ar-KW",
  "Arabic (Lebanon)": "ar-LB",
  "Arabic (Qatar)": "ar-QA",
  "Arabic (UAE)": "ar-AE",
  "Arabic (Morocco)": "ar-MA",
  "Arabic (Iraq)": "ar-IQ",
  "Arabic (Algeria)": "ar-DZ",
  "Arabic (Bahrain)": "ar-BH",
  "Arabic (Lybia)": "ar-LY",
  "Arabic (Oman)": "ar-OM",
  "Arabic (Saudi Arabia)": "ar-SA",
  "Arabic (Tunisia)": "ar-TN",
  "Arabic (Yemen)": "ar-YE",
  Czech: "cs",
  Dutch: "nl-NL",
  "English (Australia)": "en-AU",
  "English (Canada)": "en-CA",
  "English (India)": "en-IN",
  "English (New Zealand)": "en-NZ",
  "English (South Africa)": "en-ZA",
  "English(UK)": "en-GB",
  "English(US)": "en-US",
  Finnish: "fi",
  French: "fr-FR",
  Galician: "gl",
  German: "de-DE",
  "Greek ": "el-GR",
  Hebrew: "he",
  Hungarian: "hu",
  Icelandic: "is",
  Italian: "it-IT",
  Indonesian: "id",
  Japanese: "ja",
  Korean: "ko",
  Latin: "la",
  "Mandarin Chinese": "zh-CN",
  Taiwanese: "zh-TW",
  Cantonese: "zh-HK",
  Malaysian: "ms-MY",
  Norwegian: "no-NO",
  Polish: "pl",
  "Pig Latin": "xx-piglatin",
  Portuguese: "pt-PT",
  "Portuguese (Brasil)": "pt-br",
  Romanian: "ro-RO",
  Russian: "ru",
  Serbian: "sr-SP",
  Slovak: "sk",
  "Spanish (Argentina)": "es-AR",
  "Spanish (Bolivia)": "es-BO",
  "Spanish (Chile)": "es-CL",
  "Spanish (Colombia)": "es-CO",
  "Spanish (Costa Rica)": "es-CR",
  "Spanish (Dominican Republic)": "es-DO",
  "Spanish (Ecuador)": "es-EC",
  "Spanish (El Salvador)": "es-SV",
  "Spanish (Guatemala)": "es-GT",
  "Spanish (Honduras)": "es-HN",
  "Spanish (Mexico)": "es-MX",
  "Spanish (Nicaragua)": "es-NI",
  "Spanish (Panama)": "es-PA",
  "Spanish (Paraguay)": "es-PY",
  "Spanish (Peru)": "es-PE",
  "Spanish (Puerto Rico)": "es-PR",
  "Spanish (Spain)": "es-ES",
  "Spanish (US)": "es-US",
  "Spanish (Uruguay)": "es-UY",
  "Spanish (Venezuela)": "es-VE",
  Swedish: "sv-SE",
  Turkish: "tr",
  Zulu: "zu",
};
export default function SpeechSummarize() {
  const [started, setStarted] = useState(false);
  const [dictLang, setDictLang] = useState("en-US");
  const [outLang, setOutLang] = useState("en-US");

  let {
    transcript,
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleListen = () => {
    if (started) {
      SpeechRecognition.stopListening();
      setStarted(false);
    } else {
      SpeechRecognition.startListening({
        continuous: true,
        language: dictLang,
      });
      setStarted(true);
    }
  };
  return (
    <>
      <Head>
        <title>Speech Summarize | RiemannAI</title>
        <meta
          name="description"
          content="Translate, Summarize, Learn with Riemann AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideBar active="speech">
        <Heading as="h1" size="2xl" color="gray.700" mb="4" fontWeight="black">
          Speech{" "}
          <Text as="span" color="#69cfbc">
            Summarize
          </Text>
        </Heading>

        <hr />

        <Heading
          as="h1"
          size="md"
          color="gray.700"
          mt={8}
          mb="4"
          fontWeight="bold"
        >
          1. Choose your input and output languages
        </Heading>
        <HStack>
          <Select
            placeholder="Dictated Language (default: English)"
            onChange={(e) => setDictLang(e.target.value)}
          >
            {Object.keys(languages).map((key, index) => {
              return (
                <>
                  <option key={index} value={languages[key]}>
                    {key}
                  </option>
                </>
              );
            })}
          </Select>
          <Select
            placeholder="Output Language (default: English)"
            onChange={(e) => setOutLang(e.target.value)}
          >
            {Object.keys(languages).map((key, index) => {
              return (
                <>
                  <option key={index} value={languages[key]}>
                    {key}
                  </option>
                </>
              );
            })}
          </Select>
        </HStack>

        <Heading
          as="h1"
          size="md"
          color="gray.700"
          mt={24}
          mb="1"
          fontWeight="bold"
        >
          2. Record your transcription!
        </Heading>
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">
            Note:
          </Text>{" "}
          You will need to say "period" each time a period should be inserted.
        </Text>
        <Box mt={4}>
          <Flex alignItems="center">
            <Link
              bg={"#BEE3ED"}
              px={8}
              rounded="md"
              fontWeight="semibold"
              mr={4}
              _hover={{
                bg: "#99dff2",
              }}
              onClick={handleListen}
            >
              {started ? "Pause" : "Start"}
            </Link>
            <Text>
              <b>Microphone:</b> {listening ? "On" : "Off (or no access)"}
            </Text>
          </Flex>
          <Box
            p={4}
            rounded="md"
            shadow="sm"
            bg="gray.100"
            overflowY="scroll"
            height="200px"
            mt={4}
          >
            <Text>{transcript}</Text>
          </Box>
        </Box>
        <Heading
          as="h1"
          size="md"
          color="gray.700"
          mt={24}
          mb="1"
          fontWeight="bold"
        >
          3. Watch the magic happen!
        </Heading>
        <Link
          ml={2}
          mt={24}
          bg={"#BEE3ED"}
          px={8}
          rounded="md"
          fontWeight="semibold"
          mr={4}
          _hover={{
            bg: "#99dff2",
          }}
        >
          Summarize
        </Link>
      </SideBar>
    </>
  );
}
