import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Link,
  Button,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Img,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import {
  AiOutlineHeart,
  AiOutlineCheckCircle,
  AiOutlineDotChart,
} from "react-icons/ai";
import { BsCalculator, BsCodeSlash, BsBook } from "react-icons/bs";
import { BiWalk, BiMicrophone } from "react-icons/bi";
import { SiCodefactor } from "react-icons/si";
import { User } from "../User";
const LinkItems = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Speech", icon: BiMicrophone, href: "/riemann-speech-summarize" },
  { name: "Extractive", icon: BsBook, href: "/extractive-summarization" },
  {
    name: "Abstractive",
    icon: SiCodefactor,
    href: "/abstractive-summarization",
  },
  {
    name: "Developers",
    icon: BsCodeSlash,
    href: "/developers",
  },
];

export const SideBar = ({ active, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        active={active}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent active={active} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, active, ...rest }) => {
  return (
    <Box
      // transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex align="center">
          <Img src="/logo.png" h="9" display="inline" mr="3" />
          <Text fontSize="xl" fontWeight="black" color="gray.700">
            Riemann
            <Text as="span" color="#98DFD2">
              AI
            </Text>
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          active={active}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, href, active, ...rest }) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontWeight="semibold"
        bg={active === children.toLowerCase() ? "#BEE3ED" : "transparent"}
        color={active === children.toLowerCase() ? "white.off" : "black.light"}
        transition="all 0.2s"
        _hover={{
          bg: "#BEE3ED",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Img
        src="/logo.png"
        h="12"
        display={{ base: "inline", md: "none" }}
        mr="3"
        mt="-1"
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Menu>
          <MenuButton
            size="lg"
            as={IconButton}
            color="black"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          ></MenuButton>
          <MenuList>
            <MenuItem>
              <Flex d="flex" alignItems="center" color="gray.500">
                <Icon as={AiOutlineCheckCircle} mr="2" />
                <Text fontSize="sm" fontWeight="semibold">
                  Summarized one piece of text today!
                </Text>
              </Flex>
            </MenuItem>
            <MenuItem>
              <Flex d="flex" alignItems="center" color="gray.500">
                <Icon as={AiOutlineCheckCircle} mr="2" />
                <Text fontSize="sm" fontWeight="semibold">
                  Saved 50 mins of reading time{" "}
                </Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
        <User />
      </HStack>
    </Flex>
  );
};
