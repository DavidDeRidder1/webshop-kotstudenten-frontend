import { Box, Text, Button } from '@chakra-ui/react';

const Category = ({ id, name }) => {

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mb="4"
      p="4"
      m="2"
      textAlign="left"
      width="200px"
      boxShadow="md"
      backgroundColor="#EADCC6"
    >
      <Text fontSize="xl" fontWeight="bold" mb="2">
        {name}
      </Text>

    </Box>
  );
};

export default Category;