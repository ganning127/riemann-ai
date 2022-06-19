import Head from "next/head";
import { Landing } from "../components/Landing";
import { Container } from "@chakra-ui/react";
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

      <Container maxW="container.xl"></Container>
    </>
  );
}
