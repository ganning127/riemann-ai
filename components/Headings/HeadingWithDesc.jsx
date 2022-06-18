import { Heading, Text, Box } from "@chakra-ui/react";

export const HeadingWithDesc = ({ desc, children }) => {
  const headingColor = "gray.800";
  const textColor = "gray.600";
  return (
    <Box textAlign="" maxW="700px" mx="auto">
      <Heading as="h1" size="xl" color={headingColor} mb="4" fontWeight="bold">
        {children}
      </Heading>
      {desc && (
        <Text fontWeight="normal" color={textColor} fontSize="xl" my="3">
          {desc}
        </Text>
      )}
    </Box>
  );
};
