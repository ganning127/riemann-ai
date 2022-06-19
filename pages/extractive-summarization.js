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
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdRestaurantMenu } from "react-icons/md";

export default function Extractive() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [origText, setOrigText] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [pKeep, setPKeep] = useState(0.3);
  const textColor = "gray.700";

  const handleSubmit = async (e) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      const options = {
        method: "POST",
        headers: {
          pkeep: pKeep,
        },
        body: JSON.stringify({ origText: origText }),
      };

      const resp = await fetch("/api/extractive-sum", options);
      const data = await resp.json();
      setSummary(data.summary + ".");
      console.log(data);
      setIsSubmitted(true);
      setLoading(false);
    }, 700);
  };
  return (
    <>
      <Head>
        <title>Extractive Summarization | RiemannAI</title>
        <meta
          name="description"
          content="Translate, Summarize, Learn with Riemann AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideBar active="extractive">
        <Heading as="h1" size="2xl" color="gray.700" mb="4" fontWeight="black">
          Extractive{" "}
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
              <FormControl isRequired borderRadius="20" color="gray.900" my={8}>
                <FormLabel htmlFor="pKeep" color="blue.dark">
                  Proportion of Sentences to Keep (default 0.3)
                </FormLabel>
                <NumberInput
                  defaultValue={0.3}
                  min={0}
                  max={1}
                  id="pKeep"
                  onInput={(e) => setPKeep(e.target.value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired borderRadius="20" color={textColor}>
                <Textarea
                  placeholder="Type long message here..."
                  rows="5"
                  onInput={(e) => setOrigText(e.target.value)}
                  _placeholder={{ color: textColor }}
                />
              </FormControl>

              <Button
                w="100%"
                mt={4}
                bg="#69cfbc"
                color="white"
                _hover={{ bg: "#54ab9b" }}
                type="submit"
              >
                {loading && <Spinner mr="2" />} Extractive Summarization
              </Button>
            </Form>
          </Formik>

          {isSubmitted && (
            <Box bg="white" rounded="md" p={4} shadow="lg">
              <Heading
                as="h1"
                size="lg"
                color="gray.700"
                mb="4"
                fontWeight="black"
              >
                <Text as="span" color="#69cfbc">
                  Summarization
                </Text>
              </Heading>
              <Text bg="blue.shade" mt={4}>
                {summary}
              </Text>
            </Box>
          )}
        </Box>
      </SideBar>
    </>
  );
}
