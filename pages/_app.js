import "regenerator-runtime/runtime";
import * as React from "react";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { useColorMode } from "@chakra-ui/react";

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: #fffff;
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <GlobalStyle>
        <Component {...pageProps} />
      </GlobalStyle>
    </ChakraProvider>
  );
}

export default MyApp;
