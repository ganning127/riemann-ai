import { Box, Flex, Text, Img } from "@chakra-ui/react";
import * as React from "react";
import { NavContent } from "./NavContent";
import { motion } from "framer-motion";

export const NavBar = ({ bg, active }) => (
  <Box bg={bg ? bg : "white.off"} pt="1" position="sticky" top="0" zIndex="100">
    <Box as="header" height="16" position="relative" color="black.light">
      <Box
        height="100%"
        // mx="auto"
        px={{
          base: "8",
          md: "8",
        }}
        pe={{
          base: "8",
          md: "8",
        }}
      >
        <Flex
          as="nav"
          aria-label="Site navigation"
          align="center"
          justify="space-between"
          height="100%"
          alignItems="center"
        >
          <motion.a href="/" whileHover={{ scale: 1.1 }}>
            <Flex align="center">
              <Img src="/logo.png" h="12" display="inline" mr="3" />
              <Text fontSize="2xl" fontWeight="black" color="gray.700">
                Riemann
                <Text as="span" color="#98DFD2">
                  AI
                </Text>
              </Text>
            </Flex>
          </motion.a>

          <NavContent.Desktop
            display={{
              base: "none",
              md: "flex",
            }}
            active={active}
          />
          <NavContent.Mobile
            display={{
              base: "flex",
              md: "none",
            }}
          />
        </Flex>
      </Box>
    </Box>
  </Box>
);
