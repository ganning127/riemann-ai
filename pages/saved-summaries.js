import Head from "next/head";
import { SideBar } from "../components/SideBar.jsx";
import {
  Heading,
  Text,
  Box,
  Spinner,
  FormControl,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdRestaurantMenu } from "react-icons/md";

export default function SavedSummaries() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // get items from localstorage and make a table
    const itemsStorage = JSON.parse(localStorage.getItem("riemann_db"));
    setItems(itemsStorage);
  }, []);
  return (
    <SideBar active="saved summaries">
      <Heading as="h1" size="2xl" color="gray.700" mb="4" fontWeight="black">
        Saved{" "}
        <Text as="span" color="#69cfbc">
          Summaries
        </Text>
      </Heading>

      <hr />
      {items.map((item, index) => {
        const useDate = new Date(item.date);
        return (
          <Box key={index} p={4} rounded="md" shadow="md">
            <Text fontWeight="bold" fontSize="2xl">
              Summary {index + 1}
            </Text>
            <Text fontStyle="italic" fontSize="sm">
              Date Recorded: {useDate.toLocaleString()}
            </Text>
            <Text fontWeight="bold" fontSize="md">
              Summary:
            </Text>
            <Text>{item.summarized}</Text>
          </Box>
        );
      })}
    </SideBar>
  );
}
