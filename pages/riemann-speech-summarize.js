import { SideBar } from "../components/SideBar.jsx";
import Head from "next/head";
import { Landing } from "../components/Landing";
import { Container } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
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

      <SideBar active="speech" />
    </>
  );
}
