import Head from "next/head";
import { SideBar } from "../components/SideBar.jsx";
import {
  Heading,
  Text,
  Box,
  Spinner,
  FormControl,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdRestaurantMenu } from "react-icons/md";

export default function SavedSummaries() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // get items from localstorage and make a table
    const itemsStorage = JSON.parse(localStorage.getItem("riemann_db"));
    if (!itemsStorage) {
      let currItems = [
        {
          date: "2022-06-19T16:51:11.962Z",
          spokenTranscript:
            "Uber Technologies, Inc. (Uber) is an American mobility as a service provider. It is based in San Francisco with operations in approximately 72 countries and 10,500 cities.[1] Its services include ride-hailing, food delivery (Uber Eats and Postmates), package delivery, couriers, freight transportation,[2] electric bicycle and motorized scooter rental via a partnership with Lime,[3] and ferry transport in partnership with local operators.[4] Uber does not own any vehicles; instead, it receives a commission from each booking. Fares are quoted to the customer in advance but vary using a dynamic pricing model based on the local supply and demand at the time of the booking.[5]\n\n    Uber offers many different types of ride options. UberX is the most popular[6] and the standard service of the company. UberXL, Uber Comfort, and Uber Black are other options offered by the company. UberXL's are usually a SUV sided vehicle and can accommodate up to 6 people.[7] Uber's premium service is Uber Black. Uber Black drivers have to be highly rated[8] and drive more luxurious vehicles then UberX and UberXL. Uber Comfort guarantees a newer vehicle with more leg room.[9] The different types of options gives customers more flexibility when choosing a ride.\n    \n    In the fourth quarter of 2021, Uber had 118 million monthly active users worldwide and generated an average of 19 million trips per day.[10] In the United States, as of January 2022, Uber had a 71% market share for ride-sharing[11] and a 27% market share for food delivery.[12] Uber has been so prominent in the sharing economy that commoditization of service industries using computing platforms has been referred to as uberisation,[13] and several startups have described their offerings as \"Uber for X\".[14] Uber has posted hundreds of millions or billions of dollars in losses each year since 2014 except for 2018,[15][16] when it exited the markets in Russia, China, and Southeast Asia in exchange for stakes in rival businesses.[17]\n    \n    Like similar companies, Uber has been criticized for the treatment of its drivers as gig workers.",
          summarized:
            "Uber Technologies, Inc. (Uber) is an American mobility as a service provider. It is based in San Francisco with operations in approximately 72 countries and 10,500 cities. UberXL, Uber Comfort, and Uber Black are other options offered by the company. [1] Its services include ride-hailing, food delivery (Uber Eats and Postmates), package delivery, couriers, freight transportation,[2] electric bicycle and motorized scooter rental via a partnership with Lime,[3] and ferry transport in partnership with local operators. Uber offers many different types of ride options.",
        },
        {
          date: "2022-06-19T16:51:35.983Z",
          spokenTranscript:
            "The Boeing 737 MAX is the fourth generation of the Boeing 737, a narrow-body airliner manufactured by Boeing Commercial Airplanes (BCA), a division of American company Boeing. It succeeds the Boeing 737 Next Generation (NG) and competes with the Airbus A320neo family. The new series was announced on August 30, 2011. It took its maiden flight on January 29, 2016 and was certified by the United States Federal Aviation Administration (FAA) in March 2017. The first delivery was a MAX 8 in May 2017 to Malindo Air, with whom it commenced service on May 22, 2017.\n\n    The 737 MAX is based on earlier 737 designs, with more efficient CFM International LEAP-1B engines, aerodynamic changes, including distinctive split-tip winglets, and airframe modifications. The 737 MAX series has been offered in four variants, offering 138 to 204 seats in typical two-class configuration, and a range of 3,300 to 3,850 nautical miles (6,110 to 7,130 km). The 737 MAX 7, MAX 8 (including the 200–seat MAX 200), and MAX 9 are intended to replace the 737-700, -800, and -900 respectively, and a further-stretched 737 MAX 10 is available. As of May 2022, the 737 MAX has 4,094 unfilled orders and 797 deliveries.\n    \n    The 737 MAX suffered a recurring failure in the Maneuvering Characteristics Augmentation System (MCAS) causing two fatal crashes, Lion Air Flight 610 and Ethiopian Airlines Flight 302, in which 346 people total died. It was subsequently grounded worldwide from March 2019 to November 2020. Investigations faulted a Boeing cover-up of a defect and lapses in the FAA's certification of the aircraft for flight. After being charged with fraud, Boeing settled to pay over US$2.5 billion in penalties and compensation.\n    \n    The FAA cleared the return to service on November 18, 2020, subject to mandated design and training changes. Canadian and European authorities followed in late January 2021, and Chinese authorities in early December, as over 180 countries out of 195 had lifted the grounding. Over 450 MAX aircraft were awaiting delivery in November 2020; 335 remained by January 2022. Boeing estimated that the backlog would be largely cleared by the end of 2023.",
          summarized:
            "The Boeing 737 MAX is the fourth generation of the Boeing 737, a narrow-body airliner manufactured by Boeing Commercial Airplanes (BCA), a division of American company Boeing. The new series was announced on August 30, 2011. It took its maiden flight on January 29, 2016 and was certified by the United States Federal Aviation Administration (FAA) in March 2017. The 737 MAX series has been offered in four variants, offering 138 to 204 seats in typical two-class configuration, and a range of 3,300 to 3,850 nautical miles (6,110 to 7,130 km). As of May 2022, the 737 MAX has 4,094 unfilled orders and 797 deliveries. It was subsequently grounded worldwide from March 2019 to November 2020. The first delivery was a MAX 8 in May 2017 to Malindo Air, with whom it commenced service on May 22, 2017.",
        },
        {
          date: "2022-06-19T16:52:10.475Z",
          spokenTranscript:
            'The meaning of health has evolved over time. In keeping with the biomedical perspective, early definitions of health focused on the theme of the body\'s ability to function; health was seen as a state of normal function that could be disrupted from time to time by disease. An example of such a definition of health is: "a state characterized by anatomic, physiologic, and psychological integrity; ability to perform personally valued family, work, and community roles; ability to deal with physical, biological, psychological, and social stress".[3] Then, in 1948, in a radical departure from previous definitions, the World Health Organization (WHO) proposed a definition that aimed higher, linking health to well-being, in terms of "physical, mental, and social well-being, and not merely the absence of disease and infirmity".[4] Although this definition was welcomed by some as being innovative, it was also criticized for being vague and excessively broad and was not construed as measurable. For a long time, it was set aside as an impractical ideal, with most discussions of health returning to the practicality of the biomedical model.[5]\n\n    Just as there was a shift from viewing disease as a state to thinking of it as a process, the same shift happened in definitions of health. Again, the WHO played a leading role when it fostered the development of the health promotion movement in the 1980s. This brought in a new conception of health, not as a state, but in dynamic terms of resiliency, in other words, as "a resource for living". In 1984, WHO revised the definition of health defined it as "the extent to which an individual or group is able to realize aspirations and satisfy needs and to change or cope with the environment. Health is a resource for everyday life, not the objective of living; it is a positive concept, emphasizing social and personal resources, as well as physical capacities."[6] Thus, health referred to the ability to maintain homeostasis and recover from adverse events. Mental, intellectual, emotional and social health referred to a person\'s ability to handle stress, to acquire skills, to maintain relationships, all of which form resources for resiliency and independent living.[5] This opens up many possibilities for health to be taught, strengthened and learned.\n    \n    Since the late 1970s, the federal Healthy People Program has been a visible component of the United States’ approach to improving population health.[7][8] In each decade, a new version of Healthy People is issued,[9] featuring updated goals and identifying topic areas and quantifiable objectives for health improvement during the succeeding ten years, with assessment at that point of progress or lack thereof. Progress has been limited to many objectives, leading to concerns about the effectiveness of Healthy People in shaping outcomes in the context of a decentralized and uncoordinated US health system. Healthy People 2020 gives more prominence to health promotion and preventive approaches and adds a substantive focus on the importance of addressing social determinants of health. A new expanded digital interface facilitates use and dissemination rather than bulky printed books as produced in the past. The impact of these changes to Healthy People will be determined in the coming years.[10]\n    \n    Systematic activities to prevent or cure health problems and promote good health in humans are undertaken by health care providers. Applications with regard to animal health are covered by the veterinary sciences. The term "healthy" is also widely used in the context of many types of non-living organizations and their impacts for the benefit of humans, such as in the sense of healthy communities, healthy cities or healthy environments. In addition to health care interventions and a person\'s surroundings, a number of other factors are known to influence the health status of individuals. These are referred to as the "determinants of health", which include the individual\'s background, lifestyle, economic status, social conditions and spirituality; Studies have shown that high levels of stress can affect human health.[11]',
          summarized:
            'The meaning of health has evolved over time. This brought in a new conception of health, not as a state, but in dynamic terms of resiliency, in other words, as "a resource for living". Health is a resource for everyday life, not the objective of living; Studies have shown that high levels of stress can affect human health. In keeping with the biomedical perspective, early definitions of health focused on the theme of the body\'s ability to function; [3] Then, in 1948, in a radical departure from previous definitions, the World Health Organization (WHO) proposed a definition that aimed higher, linking health to well-being, in terms of "physical, mental, and social well-being, and not merely the absence of disease and infirmity". [10]\n    \n    Systematic activities to prevent or cure health problems and promote good health in humans are undertaken by health care providers.',
        },
        {
          date: "2022-06-19T16:52:45.885Z",
          spokenTranscript:
            "A car (or automobile) is a wheeled motor vehicle used for transportation. Most definitions of cars say that they run primarily on roads, seat one to eight people, have four wheels, and mainly transport people rather than goods.[2][3]\n\n    Cars came into global use during the 20th century, and developed economies depend on them. The year 1886 is regarded as the birth year of the car when German inventor Carl Benz patented his Benz Patent-Motorwagen.[1][4][5] Cars became widely available in the early 20th century. One of the first cars accessible to the masses was the 1908 Model T, an American car manufactured by the Ford Motor Company. Cars were rapidly adopted in the US, where they replaced animal-drawn carriages and carts.[6] In Europe and other parts of the world, demand for automobiles did not increase until after World War II.[6]\n    \n    Cars have controls for driving, parking, passenger comfort, and a variety of lights. Over the decades, additional features and controls have been added to vehicles, making them progressively more complex. These include rear-reversing cameras, air conditioning, navigation systems, and in-car entertainment. Most cars in use in the early 2020s are propelled by an internal combustion engine, fueled by the combustion of fossil fuels. Electric cars, which were invented early in the history of the car, became commercially available in the 2000s and are predicted to cost less to buy than gasoline cars before 2025.[7][8] The transition from fossil fuels to electric cars features prominently in most climate change mitigation scenarios,[9] such as Project Drawdown's 100 actionable solutions for climate change.[10]\n    \n    There are costs and benefits to car use. The costs to the individual include acquiring the vehicle, interest payments (if the car is financed), repairs and maintenance, fuel, depreciation, driving time, parking fees, taxes, and insurance.[11] The costs to society include maintaining roads, land use, road congestion, air pollution, public health, healthcare, and disposing of the vehicle at the end of its life. Traffic collisions are the largest cause of injury-related deaths worldwide.[12]\n    \n    Personal benefits include on-demand transportation, mobility, independence, and convenience.[13] Societal benefits include economic benefits, such as job and wealth creation from the automotive industry, transportation provision, societal well-being from leisure and travel opportunities, and revenue generation from taxes. People's ability to move flexibly from place to place has far-reaching implications for the nature of societies.[14] There are around 1 billion cars in use worldwide. Car usage is increasing rapidly, especially in China, India, and other newly industrialized countries.[15]",
          summarized:
            "A car (or automobile) is a wheeled motor vehicle used for transportation. [14] There are around 1 billion cars in use worldwide. Most cars in use in the early 2020s are propelled by an internal combustion engine, fueled by the combustion of fossil fuels. [10]\n    \n    There are costs and benefits to car use. Car usage is increasing rapidly, especially in China, India, and other newly industrialized countries. Cars came into global use during the 20th century, and developed economies depend on them.",
        },
      ];
      localStorage.setItem("riemann_db", JSON.stringify(currItems));
    }
    setItems(itemsStorage);
  }, []);
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

        <hr />
        {items.map((item, index) => {
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
            </Box>
          );
        })}
      </SideBar>
    </>
  );
}
