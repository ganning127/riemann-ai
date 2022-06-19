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
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdRestaurantMenu } from "react-icons/md";

export default function Extractive() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [origText, setOrigText] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [numBullets, setNumBullets] = useState(3);
  const [summary, setSummary] = useState("");
  const [answer, setAnswer] = useState("");
  const [bullets, setBullets] = useState([]);
  const textColor = "gray.700";

  const handleSubmit = async (e) => {
    event.preventDefault();
    setLoading(true);
    if (origText === "") {
      alert("Please enter a paper");
      return;
    }
    let useQ = "";
    if (question == "") {
      useQ = "N/A";
    } else {
      useQ = question;
    }

    const options = {
      method: "POST",
      body: JSON.stringify({
        origText,
        question: useQ,
        numBullets,
      }),
    };

    const resp = await fetch("/api/abstractive-summarization", options);
    const data = await resp.json();

    console.log("data:", data);
    setSummary(data.summary);
    setBullets(data.bullets);

    if (question != "") {
      setAnswer(data.answer);
      console.log("question", question);
    }

    setIsSubmitted(true);
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>Abstractive Summarization | RiemannAI</title>
        <meta
          name="description"
          content="Translate, Summarize, Learn with Riemann AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideBar active="abstractive">
        <Heading as="h1" size="2xl" color="gray.700" mb="4" fontWeight="black">
          Abstractive{" "}
          <Text as="span" color="#69cfbc">
            Summarization
          </Text>
        </Heading>

        <hr />
        <Box mx="auto" w="100%">
          <Formik
            initialValues={{ name: "Sasuke" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            <Form onSubmit={handleSubmit}>
              <VStack spacing={8} mt={4}>
                <FormControl isRequired borderRadius="20" color={textColor}>
                  <FormLabel htmlFor="lastname" color="blue.dark">
                    Paste in a long piece of text{" "}
                  </FormLabel>
                  <Textarea
                    placeholder="Paste long message here (min 20 sentences)..."
                    rows="10"
                    onInput={(e) => setOrigText(e.target.value)}
                    _placeholder={{ color: textColor }}
                  />
                </FormControl>

                <FormControl borderRadius="20" color="gray.900">
                  <FormLabel htmlFor="lastname" color="blue.dark">
                    Type in a question (N/A if none)
                  </FormLabel>
                  <Input
                    onInput={(e) => setQuestion(e.target.value)}
                    type="text"
                    placeholder="Type a question to ask about the text..."
                    color="gray.900"
                  />
                </FormControl>

                <FormControl isRequired borderRadius="20" color="gray.900">
                  <FormLabel>Number of bullets wanted</FormLabel>
                  <NumberInput
                    defaultValue={3}
                    min={1}
                    max={10}
                    onInput={(e) => setNumBullets(e.target.value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <Button
                  w="100%"
                  mt={4}
                  bg="#69cfbc"
                  color="white"
                  _hover={{ bg: "#54ab9b" }}
                  type="submit"
                >
                  {loading && <Spinner mr="2" />} Abstractive Summarization
                </Button>
              </VStack>
            </Form>
          </Formik>

          {isSubmitted && (
            <VStack justifyContent="flex-start">
              <Box bg="white" p={4} rounded="md" shadow="md" w="100%">
                <Text fontWeight="bold">Summary:</Text>
                <Text>{summary}</Text>
              </Box>

              <Box bg="white" p={4} rounded="md" shadow="md" w="100%">
                <Text fontWeight="bold">Answer:</Text>
                <Text>{question === "N/A" ? "None" : answer}</Text>
              </Box>

              <Box bg="white" p={4} rounded="md" shadow="md" w="100%">
                <Text fontWeight="bold">Main Points:</Text>

                <UnorderedList>
                  {bullets.map((bullet, i) => (
                    <ListItem key={i}>{bullet}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            </VStack>
          )}
        </Box>
      </SideBar>
    </>
  );
}
