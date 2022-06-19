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
export default function Home() {
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
