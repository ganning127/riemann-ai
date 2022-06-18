import { SideBar } from "../components/SideBar.jsx";
import Head from "next/head";
import { Landing } from "../components/Landing";
import { Container, Heading, Text, Box, Button } from "@chakra-ui/react";
import { HeadingWithDesc } from "../components/Headings/HeadingWithDesc.jsx";

import Dictaphone from "../components/Dictaphone.jsx";

export default function SpeechSummarize() {
  return (
    <>
      <Head>
        <title>Speech Summarize | RiemannAI</title>
        <meta
          name="description"
          content="Translate, Summarize, Learn with Riemann AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideBar active="speech">
        <Heading as="h1" size="xl" color="gray.700" mb="4" fontWeight="black">
          Speech{" "}
          <Text as="span" color="#69cfbc">
            Summarize
          </Text>
        </Heading>

        <Dictaphone />
      </SideBar>
    </>
  );
}
