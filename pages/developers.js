import Head from "next/head";
import { Landing } from "../components/Landing";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Img,
  UnorderedList,
  ListItem,
  Code,
} from "@chakra-ui/react";
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
      <Box bg="black" minH="100vh">
        <NavBar mode="dark" />

        <Container maxW="container.xl" p={4} mt={20}>
          <Img src="/logo.png" h="24" mx="auto" />
          <Box>
            <Heading
              fontWeight="black"
              textAlign="center"
              color="#98DFD2"
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            >
              RiemannAI{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
              >
                Developers.{" "}
              </Text>
            </Heading>
          </Box>

          <Box mt={24} textAlign="center" maxW="700px" mx="auto">
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              color="#98DFD2"
              fontWeight="black"
            >
              Our does our API work?
            </Heading>
            <Text color="gray.400" fontWeight={400}>
              Whether you&apos;re just learning to code, an experienced
              developer, or a student wanting to create simplified versions of
              text to read, the RiemannAI API is for you! All API endpoints are
              completely free for all use cases. In order for us to keep
              providing this service, please do not make spam or unnecessarily
              large numbers of requests to any API endpoint.
            </Text>
          </Box>

          <Box mt={24}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              <Box>
                <Heading
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="#98DFD2"
                  fontWeight="black"
                >
                  Extractive Summarization
                </Heading>
                <Text color="gray.400" fontWeight={400}>
                  We provide an endpoint that allows for extractive
                  summarization. Extractive summarization keeps important
                  sentences and cuts out unimportant ones from the original
                  piece of text. <b>Note:</b> Please use{" "}
                  <Code>JSON.stringify()</Code> before sending data over to this
                  API endpoint.
                </Text>
                <Code colorScheme="blue" fontSize="2xl" mt={4}>
                  POST
                </Code>
                <Code colorScheme="blue" fontSize="2xl" mt={4} ml={4}>
                  /api/extractive-sum
                </Code>
                <Text color="gray.400" fontWeight={400} mt={4}>
                  <b>Headers:</b>
                </Text>
                <UnorderedList color="gray.400">
                  <ListItem>
                    <Code>pKeep</Code>: The proportion of sentences to take from
                    the original text for the summary.
                  </ListItem>
                </UnorderedList>
                <Text color="gray.400" fontWeight={400} mt={4}>
                  <b>Body:</b>
                </Text>
                <UnorderedList color="gray.400">
                  <ListItem>
                    <Code>origText</Code>: The original piece of text.
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Text color="gray.400" fontWeight={400} mt={4}>
                  <b>Example:</b>
                </Text>

                <Code whiteSpace={"pre"} d="block" overflowX="scroll">{`
                const options = {
                  method: "POST",
                  headers: {
                    pkeep: pKeep,
                  },
                  body: JSON.stringify({ origText: origText }),
                };
                
                const resp = await fetch("/api/extractive-sum", options);
                const data = await resp.json();
                      `}</Code>
              </Box>
            </SimpleGrid>
          </Box>

          <Box mt={24}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              <Box>
                <Heading
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="#98DFD2"
                  fontWeight="black"
                >
                  Abstractive Summarization
                </Heading>
                <Text color="gray.400" fontWeight={400}>
                  We provide an endpoint that allows for abstractive
                  summarization. Abstractive summarization uses deep learning to
                  truly understand a piece of text. <b>Note:</b> Please use{" "}
                  <Code>JSON.stringify()</Code> before sending data over to this
                  API endpoint.
                </Text>
                <Code colorScheme="blue" fontSize="2xl" mt={4}>
                  POST
                </Code>
                <Code colorScheme="blue" fontSize="2xl" mt={4} ml={4}>
                  /api/abstractive-summarization
                </Code>

                <Text color="gray.400" fontWeight={400} mt={4}>
                  <b>Body:</b>
                </Text>
                <UnorderedList color="gray.400">
                  <ListItem>
                    <Code>origText</Code>: The original piece of text.
                  </ListItem>
                  <ListItem>
                    <Code>numBullets</Code>: Number of bullet points to return
                    in the summary.
                  </ListItem>
                  <ListItem>
                    <Code>question</Code>: The question you want to ask the API.
                    Use &quot;N/A&quot; if no question.
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Text color="gray.400" fontWeight={400} mt={4}>
                  <b>Example:</b>
                </Text>

                <Code whiteSpace={"pre"} d="block" overflowX="scroll">{`
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
                      `}</Code>
              </Box>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
