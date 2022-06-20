import Head from "next/head";
import { Landing } from "../components/Landing";
import {
  Container,
  SimpleGrid,
  Box,
  Text,
  Heading,
  Flex,
  Img,
  HStack,
  Icon,
  Button,
  Link,
} from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineCheckCircle,
  AiOutlineSave,
} from "react-icons/ai";
import { BsCalculator, BsCodeSlash, BsBook } from "react-icons/bs";
import { BiWalk, BiMicrophone } from "react-icons/bi";
import { Footer } from "../components/Footer";
import { TeamCard } from "../components/Cards/TeamCard";
import { NavBar } from "../components/NavBar";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    // get items from localstorage and make a table
    const itemsStorage = JSON.parse(localStorage.getItem("riemann_db"));
    if (!itemsStorage) {
      let currItems = [
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
      localStorage.setItem("riemann_db", JSON.stringify(currItems));
    }
  }, []);

  return (
    <>
      <Head>
        <title>RiemannAI</title>
        <meta
          name="description"
          content="Translate, Summarize, and Learn with RiemannAI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Landing />

      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={8}>
          <Box
            textAlign="center"
            p={4}
            rounded="md"
            boxShadow={`0px 0px 20px 4px #69cfbc`}
            _hover={{
              boxShadow: `0px 0px 40px 4px #69cfbc`,
            }}
            transition="all .2s"
          >
            <Flex
              align="center"
              color="gray.800"
              justifyContent="
            center"
            >
              <Icon as={BiMicrophone} fontSize="5xl" mr={2} />
              <Text fontWeight="extrabold" fontSize="xl">
                Multi-Lingual Summarization
              </Text>
            </Flex>
            <Text fontWeight="thin" fontSize="md" mt={2}>
              RiemannAI uses Microsoft Azure’s speech recognition, translation,
              and summarization models to pick up speech from the user’s device
              and output a result. Users can record audio in a variety of
              languages from Chinese to Portuguese, with RiemannAI translating,
              summarizing, and giving it back to the user in their desired
              langauge.
            </Text>
          </Box>
          <Box
            textAlign="center"
            p={4}
            rounded="md"
            boxShadow={`0px 0px 20px 4px #B5ACDC`}
            _hover={{
              boxShadow: `0px 0px 40px 4px #B5ACDC`,
            }}
            transition="all .2s"
          >
            <Flex
              align="center"
              color="gray.800"
              justifyContent="
            center"
            >
              <Icon as={BsBook} fontSize="5xl" mr={6} />
              <Text fontWeight="extrabold" fontSize="xl">
                Extractive & Abstractive
              </Text>
            </Flex>
            <Text fontWeight="thin" fontSize="md" mt={2}>
              RiemannAI provides both extractive and abstractive simplification
              techniques to reduce both the complexity and length of text. Our
              extractive summarization model features a custom built machine
              learning model and abstractive summarization extends upon
              Google&apos;s Allen NLP model.
            </Text>
          </Box>

          <Box
            textAlign="center"
            p={4}
            rounded="md"
            boxShadow={`0px 0px 20px 4px #BEE3ED`}
            _hover={{
              boxShadow: `0px 0px 40px 4px #BEE3ED`,
            }}
            transition="all .2s"
          >
            <Flex
              align="center"
              color="gray.800"
              justifyContent="
            center"
            >
              <Icon as={AiOutlineSave} fontSize="5xl" mr={6} />
              <Text fontWeight="extrabold" fontSize="xl">
                Saving to Riemann DB
              </Text>
            </Flex>
            <Text fontWeight="thin" fontSize="md" mt={2}>
              With RiemannAI, we propose a methodoloy of storing both the
              translated and summarized text into local storage systems. Users
              are able to view past summaries and access them on-demand. In this
              demo, sample data is provided for demonstration purposes.
            </Text>
          </Box>
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          mt={36}
          alignItems="center"
        >
          <Box>
            <Heading
              as="h1"
              size="2xl"
              color="gray.700"
              mb="4"
              fontWeight="black"
            >
              The{" "}
              <Text as="span" color="#69cfbc">
                Problem
              </Text>
            </Heading>
            <Text fontWeight="thin" fontSize="lg" mt={2}>
              As the world becomes more and more connected, the demand for
              foreign academic resources rises. English language learners (or
              ELLs) are defined as students who are unable to communicate or
              learn effectively in English, many of whom are English as a second
              language (or ESL) students. In the United States alone, 10.4%, or
              1 in 10, of all students fall under this category (
              <Link
                href="https://nces.ed.gov/programs/coe/indicator/cgf"
                isExternal
                color="blue.400"
              >
                nces.ed.gov
              </Link>
              ). However, many of these students’ schools lack the resources to
              help them bridge the language barrier. As ESL students ourselves,
              we have experienced such challenges in our own lives.
            </Text>
          </Box>
          <Box textAlign="center">
            <Img src="/esl_map.svg" maxH="350px" mx="auto" />
          </Box>
        </SimpleGrid>

        <Box mt={36} textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            color="gray.700"
            mb="4"
            fontWeight="black"
          >
            <Text as="span" color="#69cfbc">
              RiemannAI&apos;s
            </Text>{" "}
            Solution
          </Heading>
          <Text fontWeight="thin" fontSize="lg">
            RiemannAI is a simplistic language process interface. The key
            feature of our solution allows students to use RiemannAI to
            transcribe and translate audio recordings of lectures, discussions,
            or speeches from most languages into the student’s chosen language.
            To make the review of the material easier for these students, our
            solution also incorporates a text summarization capability that
            returns the main points from this audio recording for the student’s
            use. Yet RiemannAI is more than merely just a single tool. The
            interactive interface also introduces methods for extractive and
            abstractive summarization from the text (expanding its functionality
            to more than just audio input). The extractive summarization
            functionality allows for students to shorten long, difficult texts
            to an approachable length. On the other hand, the abstractive
            summarization function aids in the summarization and finding of
            answers to certain questions students may have. This, in turn, will
            allow students to approach work completion and studying more
            efficiently.
          </Text>
          <HStack justifyContent="center" mt={4}>
            <Button
              as="a"
              href="/riemann-speech-summarization"
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"#69cfbc"}
              _hover={{ bg: "#39bfa6" }}
            >
              Get started
            </Button>
          </HStack>
        </Box>
        <Box my={36} textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            color="gray.700"
            mb="4"
            fontWeight="black"
          >
            Our{" "}
            <Text as="span" color="#69cfbc">
              Team
            </Text>
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} mt={8}>
            <TeamCard name="Ganning Xu" title="Developer" pic="/ganning.jpg" />

            <TeamCard
              name="Cooper Xie"
              title="Graphics & Testing"
              pic="/cooper.jpeg"
            />

            <TeamCard
              name="Melody Lee"
              title="Branding & Ideation"
              pic="/melody.jpg"
            />

            <TeamCard
              name="Eric Liu"
              title="Developer & Graphics"
              pic="/eric.jpg"
            />
          </SimpleGrid>
        </Box>
        <Footer />
      </Container>
    </>
  );
}
