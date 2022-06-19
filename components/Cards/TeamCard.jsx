import { Avatar, Text, Badge, VStack, Box } from "@chakra-ui/react";

export const TeamCard = ({ name, pic, title }) => {
  return (
    <VStack rounded="md" textAlign="center" spacing={3}>
      <Badge colorScheme="blue" fontSize="sm">
        {title}
      </Badge>

      <Avatar name={name} src={pic} h="150px" w="150px" />
      <Text fontWeight="thin" fontSize="xl">
        {name}
      </Text>
    </VStack>
  );
};
