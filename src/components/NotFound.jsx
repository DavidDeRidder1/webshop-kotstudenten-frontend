import { useLocation } from "react-router";

import { Box, Heading, Link as ChakraLink, Alert } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {

  const { pathname } = useLocation();

  return (
    <Box>
      <Heading as="h1">Not found</Heading>
      <Alert status="warning" bg="#fef3cd" color="#c7a800" borderLeft="4px solid #f3c200" padding="20px">
        There is nothing at {pathname},
        <ChakraLink as={Link} to="/" replace color="blue.500">
          go back home
        </ChakraLink>
        .
      </Alert>
    </Box>
  );
}

