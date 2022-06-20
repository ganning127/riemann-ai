import { SideBar } from "../components/SideBar.jsx/index.jsx";
import Head from "next/head";
import {
  Select,
  Heading,
  Text,
  Box,
  Link,
  HStack,
  Flex,
  ListItem,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  Badge,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { HeadingWithDesc } from "../components/Headings/HeadingWithDesc.jsx";
import { useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");

const outLanguages = {
  English: "en",
  "Chinese (Simplified)": "zh-Hans",
  French: "fr",
  German: "de",
  Italian: "it",
  Japanese: "ja",
  "Portuguese (Brazil)": "pt",
};

const inLanguages = {
  English: "en",
  "Chinese (Simplified)": "zh-CN",
  French: "fr-FR",
  German: "de-DE",
  Italian: "it-IT",
  Japanese: "ja-JP",
  "Portuguese (Brazil)": "pt-BR",
  Spanish: "es-MX",
};

let keySupported = {
  English: "en",
  French: "fr",
  German: "de",
  Italian: "it",
  Japanese: "ja",
  "Portuguese (Brazil)": "pt-BR",
};
export default function SpeechSummarize() {
  const [started, setStarted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [recognizer, setRecognizer] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [dictLang, setDictLang] = useState("en-US");
  const [outLang, setOutLang] = useState("en");
  const [summs, setSumms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getAndSet();
  }, []);

  useEffect(() => {
    setTranscript([]);
    setDisplayText([]);
    setStarted(false);
    getAndSet();
  }, [dictLang]);

  const getAndSet = async () => {
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();

    const speechTranslationConfig =
      speechsdk.SpeechTranslationConfig.fromSubscription(
        process.env.NEXT_PUBLIC_COG_KEY,
        "eastus"
      );
    speechTranslationConfig.speechRecognitionLanguage = dictLang;

    for (let key of Object.keys(outLanguages)) {
      speechTranslationConfig.addTargetLanguage(outLanguages[key]);
    }

    const recognizer = new speechsdk.TranslationRecognizer(
      speechTranslationConfig,
      audioConfig
    );

    setRecognizer(recognizer);
    recognizer.stopContinuousRecognitionAsync();
  };

  const handleDictIn = async (e) => {
    setDictLang(e.target.value);
  };
  const handleOut = async (e) => {
    setOutLang(e.target.value);
  };

  const handleRecord = () => {
    if (started) {
      setStarted(false);
      recognizer.stopContinuousRecognitionAsync();
    } else {
      setStarted(true);
      recognizer.startContinuousRecognitionAsync();
    }

    recognizer.recognizing = (s, e) => {
      let words = [];
      let tempTranscript = transcript;
      if (tempTranscript.length === 0) {
        tempTranscript.push(e.result);
      }
      if (
        e.result.offset === tempTranscript[tempTranscript.length - 1].offset
      ) {
        tempTranscript[tempTranscript.length - 1] = e.result;
      } else {
        tempTranscript.push(e.result);
      }
      tempTranscript.forEach((obj) => {
        words.push(obj.translations.get(outLang));
      });

      setTranscript(tempTranscript);
      setDisplayText(words.join(". ") + ". ");
    };

    recognizer.sessionStopped = (s, e) => {
      recognizer.stopContinuousRecognitionAsync();
    };
  };

  const resetRecord = () => {
    setTranscript([]);
    setDisplayText("");
    setSumms([]);
    setKeywords([]);
    setStarted(false);
    recognizer.stopContinuousRecognitionAsync();
  };

  const handleSummarize = async () => {
    if (displayText == "") {
      alert("Please speak into the microphone before you summarize!");
      return;
    }
    setLoading(true);
    setSumms([]);
    setKeywords([]);
    const TEST_TEXT = displayText;

    setDisplayText(TEST_TEXT);

    const client = new TextAnalyticsClient(
      process.env.NEXT_PUBLIC_COG_ENDPOINT,
      new AzureKeyCredential(process.env.NEXT_PUBLIC_COG_KEY),
      {
        defaultLanguage: outLang,
      }
    );
    const documents = [TEST_TEXT];

    const numSentences = TEST_TEXT.split(/[.!?]+\s/).filter(Boolean).length;

    const maxSentences = Math.ceil(numSentences ** 0.65);

    const actions = {
      extractSummaryActions: [
        {
          modelVersion: "latest",
          orderBy: "Rank",
          maxSentenceCount: maxSentences,
        },
      ],
    };
    const poller = await client.beginAnalyzeActions(documents, actions);

    const resultPages = await poller.pollUntilDone();

    for await (const page of resultPages) {
      const extractSummaryAction = page.extractSummaryResults[0];
      if (!extractSummaryAction.error) {
        for (const doc of extractSummaryAction.results) {
          if (!doc.error) {
            for (const sentence of doc.sentences) {
              console.log("summary sent:", sentence.text);
              setSumms((summs) => [...summs, sentence.text]);
            }
          } else {
            console.error("\tError:", doc.error);
          }
        }
      }
    }

    try {
      if (Object.values(keySupported).includes(outLang)) {
        console.log("Supported");
        console.log(documents);
        const keyPhraseResult = await client.extractKeyPhrases(
          documents,
          outLang
        );

        keyPhraseResult[0].keyPhrases.forEach((phrase) => {
          setKeywords((keywords) => [...keywords, phrase]);
        });
      }
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (displayText == "") {
      alert("Please speak into the microphone before you save!");
      return;
    }

    let currDate = console.log(currDate);
    let obj = {
      date: new Date(),
      spokenTranscript: displayText,
      summarized: summs.join(" "),
      keywords: keywords,
    };

    let currItems = JSON.parse(localStorage.getItem("riemann_db"));

    currItems.push(obj);
    localStorage.setItem("riemann_db", JSON.stringify(currItems));

    toast({
      title: "Save Successful.",
      description: "We've saved your transcript and summary!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <>
      <Head>
        <title>Speech Summarize | RiemannAI</title>
        <meta
          name="description"
          content="Translate, Summarize, and Learn with RiemannAI"
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
          <Box w="100%">
            <Text fontWeight="semibold">Input (spoken) language:</Text>
            <Select onChange={handleDictIn}>
              {Object.keys(inLanguages).map((key, index) => {
                return (
                  <option key={key} value={inLanguages[key]}>
                    {key}
                  </option>
                );
              })}
            </Select>
          </Box>
          <Box w="100%">
            <Text fontWeight="semibold">
              Output (summarized/translated) language:
            </Text>
            <Select onChange={handleOut}>
              {Object.keys(outLanguages).map((key, index) => {
                return (
                  <option key={key} value={outLanguages[key]}>
                    {key}
                  </option>
                );
              })}
            </Select>
          </Box>
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
              onClick={handleRecord}
            >
              {started ? "Stop Recording" : "Start"}
            </Link>
            <Link
              bg={"#BEE3ED"}
              px={8}
              rounded="md"
              fontWeight="semibold"
              mr={4}
              _hover={{
                bg: "#99dff2",
              }}
              onClick={resetRecord}
            >
              Reset
            </Link>
          </Flex>
          {displayText != "" && (
            <Box
              rounded="md"
              bg="blackAlpha.50"
              p={4}
              shadow="md"
              overflowY="scroll"
              height="200px"
              mt={4}
            >
              <Text>{displayText}</Text>
            </Box>
          )}
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
          bg={"#BEE3ED"}
          px={8}
          py={0.5}
          rounded="md"
          fontWeight="semibold"
          mr={4}
          _hover={{
            bg: "#99dff2",
          }}
          onClick={handleSummarize}
        >
          Summarize Text
        </Link>
        {loading && <Spinner />}

        {summs.length > 0 && (
          <>
            <Box mt={4} rounded="md" bg="blackAlpha.50" p={4} shadow="md">
              <UnorderedList>
                {summs.length > 0 && (
                  <>
                    <Text fontWeight="extrabold" fontSize="lg" mt={4}>
                      Summary:
                    </Text>
                    {summs.map((item, index) => {
                      return (
                        <ListItem ml={8} key={index} fontSize="md">
                          {item}
                        </ListItem>
                      );
                    })}
                  </>
                )}

                {keywords.length > 0 && (
                  <>
                    <Text fontWeight="extrabold" fontSize="lg" mt={4}>
                      Keywords:
                    </Text>
                    {keywords.slice(0, 10).map((item, index) => {
                      return (
                        <Badge key={index} colorScheme="green" mr={2}>
                          {item}
                        </Badge>
                      );
                    })}
                  </>
                )}
              </UnorderedList>
            </Box>
            <Button
              mt={3}
              bg={"#BEE3ED"}
              _hover={{
                bg: "#99dff2",
              }}
              onClick={resetRecord}
              mr={4}
            >
              Reset
            </Button>
            <Button
              mt={3}
              bg={"#BEE3ED"}
              _hover={{
                bg: "#99dff2",
              }}
              onClick={handleSave}
            >
              Save Summary & Transcript
            </Button>
          </>
        )}
      </SideBar>
    </>
  );
}
