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
  List,
  ListItem,
  ListIcon,
  Spinner,
  OrderedList,
  UnorderedList,
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
  Korean: "ko",
  "Portuguese (Brazil)": "pt",
  "Portuguese (Portugal)": "pt-pt",
};

const inLanguages = {
  English: "en",
  "Chinese (Simplified)": "zh-Hans",
  French: "fr",
  German: "de",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  "Portuguese (Brazil)": "pt",
  "Portuguese (Portugal)": "pt-pt",
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
    console.log("dictLang:", dictLang);

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
    // setTranslator(trsl);
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
        console.log("same sentence");
        tempTranscript[tempTranscript.length - 1] = e.result;
      } else {
        console.log("diff sentence");
        tempTranscript.push(e.result);
      }
      console.log("outlang:", outLang);
      tempTranscript.forEach((obj) => {
        words.push(obj.translations.get(outLang));
      });

      console.log("words:", words);

      console.log("displayed;", words.join(". "));

      setTranscript(tempTranscript);
      setDisplayText(words.join(". "));
    };

    recognizer.sessionStopped = (s, e) => {
      recognizer.stopContinuousRecognitionAsync();
    };

    console.log("read the recognizer functions");
  };

  const resetRecord = () => {
    setTranscript([]);
    setDisplayText("");
    setStarted(false);
    recognizer.stopContinuousRecognitionAsync();
  };

  const handleSummarize = async () => {
    setLoading(true);
    setSumms([]);
    const TEST_TEXT = displayText;

    setDisplayText(TEST_TEXT);
    console.log("outLang:", outLang);
    const client = new TextAnalyticsClient(
      process.env.NEXT_PUBLIC_COG_ENDPOINT,
      new AzureKeyCredential(process.env.NEXT_PUBLIC_COG_KEY),
      {
        defaultLanguage: outLang,
      }
    );
    const documents = [TEST_TEXT];

    console.log("== Analyze Sample For Extract Summary ==");

    const actions = {
      extractSummaryActions: [
        { modelVersion: "latest", orderBy: "Rank", maxSentenceCount: 5 },
      ],
    };
    const poller = await client.beginAnalyzeActions(documents, actions, "en");

    const resultPages = await poller.pollUntilDone();

    for await (const page of resultPages) {
      const extractSummaryAction = page.extractSummaryResults[0];
      if (!extractSummaryAction.error) {
        for (const doc of extractSummaryAction.results) {
          console.log(`- Document ${doc.id}`);
          if (!doc.error) {
            console.log("\tSummary:");
            for (const sentence of doc.sentences) {
              // console.log(`\t- ${sentence.text}`);
              setSumms((summs) => [...summs, sentence.text]);
            }
          } else {
            console.error("\tError:", doc.error);
          }
        }
      }
    }
    setLoading(false);
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
          <Select onChange={handleDictIn}>
            {Object.keys(inLanguages).map((key, index) => {
              return (
                <option key={key} value={inLanguages[key]}>
                  {key}
                </option>
              );
            })}
          </Select>
          <Select onChange={handleOut}>
            {Object.keys(outLanguages).map((key, index) => {
              return (
                <option key={key} value={outLanguages[key]}>
                  {key}
                </option>
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
              {started ? "Pause" : "Start"}
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
          rounded="md"
          fontWeight="semibold"
          mr={4}
          _hover={{
            bg: "#99dff2",
          }}
          onClick={handleSummarize}
        >
          Summarize Text!
        </Link>

        {summs && (
          <Box mt={4} rounded="md" bg="blackAlpha.50" p={4} shadow="md">
            <UnorderedList>
              {summs &&
                summs.map((item, index) => {
                  return <ListItem key={index}>{item}</ListItem>;
                })}
              {loading && <Spinner />}
            </UnorderedList>
          </Box>
        )}
      </SideBar>
    </>
  );
}