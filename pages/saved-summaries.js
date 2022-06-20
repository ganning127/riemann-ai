import Head from "next/head";
import { SideBar } from "../components/SideBar.jsx";
import {
  Heading,
  Text,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Badge,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SavedSummaries() {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
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
    setItems(itemsStorage);
  }, []);

  let filteredItems = items.filter((obj) => {
    if (obj.keywords) {
      for (let i = 0; i < obj.keywords.length; i++) {
        if (obj.keywords[i].toLowerCase().includes(searchValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    } else {
      if (searchValue) {
        return false;
      }
      return true;
    }
  });

  return (
    <>
      <Head>
        <title>Saved | RiemannAI</title>
        <meta
          name="description"
          content="Translate, Summarize, and Learn with RiemannAI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar active="saved summaries">
        <Heading as="h1" size="2xl" color="gray.700" mb="4" fontWeight="black">
          Saved{" "}
          <Text as="span" color="#69cfbc">
            Summaries
          </Text>
        </Heading>
        <InputGroup mb={4} mr={4} w="100%">
          <Input
            aria-label="Search by post title or summary"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by post title or summary"
          />
          <InputRightElement>
            <SearchIcon color="gray.300" />
          </InputRightElement>
        </InputGroup>
        <hr />
        {filteredItems.map((item, index) => {
          const useDate = new Date(item.date);
          return (
            <Box key={index} p={4} rounded="md" shadow="md">
              <Text fontWeight="bold" fontSize="2xl">
                Summary {index + 1}
              </Text>
              <Text fontStyle="italic" fontSize="sm">
                Date Recorded: {useDate.toLocaleString()}
              </Text>
              <Text fontWeight="bold" fontSize="md">
                Summary:
              </Text>
              <Text>{item.summarized}</Text>
              {item.keywords &&
                item.keywords.slice(0, 10).map((item, index) => {
                  return (
                    <Badge key={index} colorScheme="green" mr={2}>
                      {item}
                    </Badge>
                  );
                })}
            </Box>
          );
        })}
      </SideBar>
    </>
  );
}
