import { Box, Heading, Divider, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box>
      <Divider my={4} />
      <Text mb={4} color="gray.600">
        Copyright {new Date().getFullYear()} RiemannAI
      </Text>
    </Box>
  );
};
