import Head from "next/head";
import { Landing } from "../components/Landing";
import { Container, Box } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
export default function Home() {
  return (
    <>
      <Head>
        <title>RiemannAI</title>
        <meta
          name="description"
          content="Translate, Summarize, Learn with Riemann AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="black" minH="100vh">
        <NavBar mode="dark" />
        <Landing />

        <Container maxW="container.xl"></Container>
      </Box>
    </>
  );
}
