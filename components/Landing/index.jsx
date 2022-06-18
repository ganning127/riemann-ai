import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from "@chakra-ui/react";

export const Landing = () => {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight="black"
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        >
          Translate.{" "}
          <Text as={"span"} color={"#69cfbc"}>
            Summarize.{" "}
          </Text>
          Learn.
        </Heading>
        <Text color={"#545454"} maxW={"3xl"}>
          RiemannAI is a SaaS designed for text summarization through by using
          Machine Learning. We provide both users, developers, and students with
          all of their text summarization tools needed to succeed.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            as="a"
            href="/riemann-speech-summarize"
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"#69cfbc"}
            _hover={{ bg: "#39bfa6" }}
          >
            Get started
          </Button>
          <Button rounded={"full"} px={6} as="a" href="/about">
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
