import { useState } from 'react'
import './App.css'
import Product from "./components/products/Product";
import { PRODUCT_DATA } from './api/mock_data';
import { ChakraProvider, Container, Box } from "@chakra-ui/react";
import CategoryList from "./components/categories/CategoryList"
import ProductList from "./components/products/ProductList"
//import { createContext } from 'react';

//export const ThemeContext = createContext();

function App() {
  return (

    <ChakraProvider>
      <Box bg="gray.100" >
        <CategoryList />
        <ProductList />
      </Box>
    </ChakraProvider>

  );
}

export default App;
