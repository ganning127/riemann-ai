import Head from "next/head";
import { Landing } from "../components/Landing";

export default function Home() {
  return (
    <>
      <Head>
        <title>Riemann AI</title>
        <meta
          name="description"
          content="Translate, Summarize, Learn with Riemann AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Landing />
    </>
  );
}
