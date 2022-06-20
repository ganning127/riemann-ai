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
  "Portuguese (Portugal)": "pt-pt",
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
  "Portuguese (Portugal)": "pt-PT",
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
    const poller = await client.beginAnalyzeActions(documents, actions, "en");

    const resultPages = await poller.pollUntilDone();

    for await (const page of resultPages) {
      const extractSummaryAction = page.extractSummaryResults[0];
      if (!extractSummaryAction.error) {
        for (const doc of extractSummaryAction.results) {
          if (!doc.error) {
            for (const sentence of doc.sentences) {
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

    if (!currItems) {
      currItems = [
        {
          date: "2022-06-19T23:05:58.828Z",
          spokenTranscript:
            "A car (or automobile) is a wheeled motor vehicle used for transportation. Most definitions of cars say that they run primarily on roads, seat one to eight people, have four wheels, and mainly transport people rather than goods.[2][3]\n\n    Cars came into global use during the 20th century, and developed economies depend on them. The year 1886 is regarded as the birth year of the car when German inventor Carl Benz patented his Benz Patent-Motorwagen.[1][4][5] Cars became widely available in the early 20th century. One of the first cars accessible to the masses was the 1908 Model T, an American car manufactured by the Ford Motor Company. Cars were rapidly adopted in the US, where they replaced animal-drawn carriages and carts.[6] In Europe and other parts of the world, demand for automobiles did not increase until after World War II.[6]\n    \n    Cars have controls for driving, parking, passenger comfort, and a variety of lights. Over the decades, additional features and controls have been added to vehicles, making them progressively more complex. These include rear-reversing cameras, air conditioning, navigation systems, and in-car entertainment. Most cars in use in the early 2020s are propelled by an internal combustion engine, fueled by the combustion of fossil fuels. Electric cars, which were invented early in the history of the car, became commercially available in the 2000s and are predicted to cost less to buy than gasoline cars before 2025.[7][8] The transition from fossil fuels to electric cars features prominently in most climate change mitigation scenarios,[9] such as Project Drawdown's 100 actionable solutions for climate change.[10]\n    \n    There are costs and benefits to car use. The costs to the individual include acquiring the vehicle, interest payments (if the car is financed), repairs and maintenance, fuel, depreciation, driving time, parking fees, taxes, and insurance.[11] The costs to society include maintaining roads, land use, road congestion, air pollution, public health, healthcare, and disposing of the vehicle at the end of its life. Traffic collisions are the largest cause of injury-related deaths worldwide.[12]\n    \n    Personal benefits include on-demand transportation, mobility, independence, and convenience.[13] Societal benefits include economic benefits, such as job and wealth creation from the automotive industry, transportation provision, societal well-being from leisure and travel opportunities, and revenue generation from taxes. People's ability to move flexibly from place to place has far-reaching implications for the nature of societies.[14] There are around 1 billion cars in use worldwide. Car usage is increasing rapidly, especially in China, India, and other newly industrialized countries.[15].",
          summarized:
            "A car (or automobile) is a wheeled motor vehicle used for transportation. [14] There are around 1 billion cars in use worldwide. Most cars in use in the early 2020s are propelled by an internal combustion engine, fueled by the combustion of fossil fuels. [10]\n    \n    There are costs and benefits to car use. Car usage is increasing rapidly, especially in China, India, and other newly industrialized countries. Cars came into global use during the 20th century, and developed economies depend on them.",
          keywords: [
            "most climate change mitigation scenarios",
            "other newly industrialized countries",
            "one to eight people",
            "Ford Motor Company",
            "World War II",
            "internal combustion engine",
            "wheeled motor vehicle",
            "early 20th century",
            "Most definitions",
            "other parts",
            "Most cars",
            "early 2020s",
            "four wheels",
            "German inventor",
            "Carl Benz",
            "Benz Patent-Motorwagen",
            "1908 Model T",
            "animal-drawn carriages",
            "passenger comfort",
            "additional features",
            "rear-reversing cameras",
            "air conditioning",
            "navigation systems",
            "fossil fuels",
            "Project Drawdown",
            "100 actionable solutions",
            "interest payments",
            "road congestion",
            "air pollution",
            "public health",
            "Traffic collisions",
            "largest cause",
            "injury-related deaths",
            "wealth creation",
            "automotive industry",
            "societal well-being",
            "travel opportunities",
            "revenue generation",
            "reaching implications",
            "Personal benefits",
            "Societal benefits",
            "economic benefits",
            "transportation provision",
            "global use",
            "first cars",
            "Electric cars",
            "gasoline cars",
            "land use",
            "1 billion cars",
            "birth year",
            "American car",
            "car entertainment",
            "driving time",
            "parking fees",
            "Car usage",
            "demand transportation",
            "car use",
            "automobile",
            "roads",
            "goods",
            "economies",
            "masses",
            "carts",
            "Europe",
            "controls",
            "variety",
            "lights",
            "decades",
            "vehicles",
            "history",
            "2000s",
            "transition",
            "costs",
            "individual",
            "repairs",
            "maintenance",
            "depreciation",
            "taxes",
            "insurance",
            "society",
            "healthcare",
            "disposing",
            "end",
            "life",
            "mobility",
            "convenience",
            "job",
            "leisure",
            "ability",
            "place",
            "nature",
            "societies",
            "China",
            "India",
          ],
        },
        {
          date: "2022-06-19T23:06:21.880Z",
          spokenTranscript:
            'Although this definition was welcomed by some as being innovative, it was also criticized for being vague and excessively broad and was not construed as measurable. For a long time, it was set aside as an impractical ideal, with most discussions of health returning to the practicality of the biomedical model.[5]\n\n    Just as there was a shift from viewing disease as a state to thinking of it as a process, the same shift happened in definitions of health. Again, the WHO played a leading role when it fostered the development of the health promotion movement in the 1980s. This brought in a new conception of health, not as a state, but in dynamic terms of resiliency, in other words, as "a resource for living". In 1984, WHO revised the definition of health defined it as "the extent to which an individual or group is able to realize aspirations and satisfy needs and to change or cope with the environment. Health is a resource for everyday life, not the objective of living; it is a positive concept, emphasizing social and personal resources, as well as physical capacities."[6] Thus, health referred to the ability to maintain homeostasis and recover from adverse events. Mental, intellectual, emotional and social health referred to a person\'s ability to handle stress, to acquire skills, to maintain relationships, all of which form resources for resiliency and independent living.[5] This opens up many possibilities for health to be taught, strengthened and learned.\n    \n    Since the late 1970s, the federal Healthy People Program has been a visible component of the United States’ approach to improving population health.[7][8] In each decade, a new version of Healthy People is issued,[9] featuring updated goals and identifying topic areas and quantifiable objectives for health improvement during the succeeding ten years, with assessment at that point of progress or lack thereof. Progress has been limited to many objectives, leading to concerns about the effectiveness of Healthy People in shaping outcomes in the context of a decentralized and uncoordinated US health system. Healthy People 2020 gives more prominence to health promotion and preventive approaches and adds a substantive focus on the importance of addressing social determinants of health. A new expanded digital interface facilitates use and dissemination rather than bulky printed books as produced in the past. The impact of these changes to Healthy People will be determined in the coming years.[10]\n    \n    Systematic activities to prevent or cure health problems and promote good health in humans are undertaken by health care providers. Applications with regard to animal health are covered by the veterinary sciences. The term "healthy" is also widely used in the context of many types of non-living organizations and their impacts for the benefit of humans, such as in the sense of healthy communities, healthy cities or healthy environments. In addition to health care interventions and a person\'s surroundings, a number of other factors are known to influence the health status of individuals. These are referred to as the "determinants of health", which include the individual\'s background, lifestyle, economic status, social conditions and spirituality; Studies have shown that high levels of stress can affect human health.[11]',
          summarized:
            'Health is a resource for everyday life, not the objective of living; This brought in a new conception of health, not as a state, but in dynamic terms of resiliency, in other words, as "a resource for living". Healthy People 2020 gives more prominence to health promotion and preventive approaches and adds a substantive focus on the importance of addressing social determinants of health. Studies have shown that high levels of stress can affect human health. Since the late 1970s, the federal Healthy People Program has been a visible component of the United States’ approach to improving population health. it is a positive concept, emphasizing social and personal resources, as well as physical capacities." Again, the WHO played a leading role when it fostered the development of the health promotion movement in the 1980s.',
          keywords: [
            "new expanded digital interface",
            "uncoordinated US health system",
            "federal Healthy People Program",
            "United States’ approach",
            "bulky printed books",
            "succeeding ten years",
            "health care providers",
            "health care interventions",
            "health promotion movement",
            "new conception",
            "new version",
            "coming years",
            "healthy communities",
            "healthy cities",
            "healthy environments",
            "long time",
            "impractical ideal",
            "most discussions",
            "biomedical model",
            "leading role",
            "dynamic terms",
            "other words",
            "everyday life",
            "positive concept",
            "physical capacities",
            "adverse events",
            "many possibilities",
            "late 1970s",
            "visible component",
            "updated goals",
            "topic areas",
            "quantifiable objectives",
            "many objectives",
            "preventive approaches",
            "substantive focus",
            "Systematic activities",
            "veterinary sciences",
            "many types",
            "non-living organizations",
            "other factors",
            "economic status",
            "high levels",
            "population health",
            "health improvement",
            "health problems",
            "good health",
            "animal health",
            "health status",
            "human health",
            "social conditions",
            "social health",
            "same shift",
            "personal resources",
            "independent living",
            "social determinants",
            "definition",
            "practicality",
            "disease",
            "process",
            "WHO",
            "development",
            "1980s",
            "resiliency",
            "extent",
            "individual",
            "group",
            "aspirations",
            "needs",
            "ability",
            "homeostasis",
            "emotional",
            "stress",
            "skills",
            "relationships",
            "decade",
            "assessment",
            "point",
            "progress",
            "lack",
            "concerns",
            "effectiveness",
            "outcomes",
            "context",
            "decentralized",
            "prominence",
            "importance",
            "use",
            "dissemination",
            "past",
            "impact",
            "changes",
            "humans",
            "Applications",
            "regard",
            "benefit",
            "sense",
            "addition",
            "surroundings",
            "number",
            "background",
            "lifestyle",
            "spirituality",
            "Studies",
          ],
        },
        {
          date: "2022-06-19T23:06:49.077Z",
          spokenTranscript:
            "Uber Technologies, Inc. (Uber) is an American mobility as a service provider. It is based in San Francisco with operations in approximately 72 countries and 10,500 cities.[1] Its services include ride-hailing, food delivery (Uber Eats and Postmates), package delivery, couriers, freight transportation,[2] electric bicycle and motorized scooter rental via a partnership with Lime,[3] and ferry transport in partnership with local operators.[4] Uber does not own any vehicles; instead, it receives a commission from each booking. Fares are quoted to the customer in advance but vary using a dynamic pricing model based on the local supply and demand at the time of the booking.[5]\n\n    Uber offers many different types of ride options. UberX is the most popular[6] and the standard service of the company. UberXL, Uber Comfort, and Uber Black are other options offered by the company. UberXL's are usually a SUV sided vehicle and can accommodate up to 6 people.[7] Uber's premium service is Uber Black. Uber Black drivers have to be highly rated[8] and drive more luxurious vehicles then UberX and UberXL. Uber Comfort guarantees a newer vehicle with more leg room.[9] The different types of options gives customers more flexibility when choosing a ride.\n    \n    In the fourth quarter of 2021, Uber had 118 million monthly active users worldwide and generated an average of 19 million trips per day.[10] In the United States, as of January 2022, Uber had a 71% market share for ride-sharing[11] and a 27% market share for food delivery.[12] Uber has been so prominent in the sharing economy that commoditization of service industries using computing platforms has been referred to as uberisation,[13] and several startups have described their offerings as \"Uber for X\".[14] Uber has posted hundreds of millions or billions of dollars in losses each year since 2014 except for 2018,[15][16] when it exited the markets in Russia, China, and Southeast Asia in exchange for stakes in rival businesses.[17]\n    \n    Like similar companies, Uber has been criticized for the treatment of its drivers as gig workers.",
          summarized:
            "Uber Technologies, Inc. (Uber) is an American mobility as a service provider. It is based in San Francisco with operations in approximately 72 countries and 10,500 cities. UberXL, Uber Comfort, and Uber Black are other options offered by the company. [1] Its services include ride-hailing, food delivery (Uber Eats and Postmates), package delivery, couriers, freight transportation,[2] electric bicycle and motorized scooter rental via a partnership with Lime,[3] and ferry transport in partnership with local operators. Uber offers many different types of ride options.",
          keywords: [
            "118 million monthly active users",
            "motorized scooter rental",
            "dynamic pricing model",
            "SUV sided vehicle",
            "many different types",
            "Uber Black drivers",
            "19 million trips",
            "newer vehicle",
            "American mobility",
            "service provider",
            "San Francisco",
            "food delivery",
            "package delivery",
            "freight transportation",
            "electric bicycle",
            "ferry transport",
            "local operators",
            "local supply",
            "standard service",
            "premium service",
            "leg room",
            "fourth quarter",
            "United States",
            "71% market share",
            "27% market share",
            "sharing economy",
            "service industries",
            "computing platforms",
            "several startups",
            "Southeast Asia",
            "rival businesses",
            "similar companies",
            "gig workers",
            "other options",
            "luxurious vehicles",
            "Uber Technologies",
            "Uber Eats",
            "Uber Comfort",
            "ride options",
            "operations",
            "72 countries",
            "10,500 cities",
            "services",
            "ride-hailing",
            "Postmates",
            "couriers",
            "partnership",
            "Lime",
            "commission",
            "booking",
            "Fares",
            "customer",
            "advance",
            "demand",
            "time",
            "UberX",
            "company",
            "6 people",
            "flexibility",
            "average",
            "day",
            "January",
            "ride-sharing",
            "commoditization",
            "uberisation",
            "offerings",
            "hundreds",
            "millions",
            "billions",
            "dollars",
            "losses",
            "markets",
            "Russia",
            "China",
            "exchange",
            "stakes",
            "treatment",
          ],
        },
      ];
    }
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
          {displayText && (
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
            {loading && <Spinner />}

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
          onClick={handleSave}
        >
          Save Summary & Transcript
        </Button>
      </SideBar>
    </>
  );
}
