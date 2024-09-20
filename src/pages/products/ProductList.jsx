import { InputGroup, Input, InputRightElement, Button, Box } from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { getAll, deleteById, buyProduct, addProductToWishlist, removeProductFromWishlist } from '../../api';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import AsyncData from '../../components/AsyncData';
import List from '../../components/products/List';
import { Link as RouterLink } from "react-router-dom"
import { useSWRConfig } from 'swr';



const ProductList = () => {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const {
    data: products = [],
    isLoading,
    error
  } = useSWR("products", getAll);

  const { trigger: triggerBuyProduct, error: buyError } = useSWRMutation("products/buy", buyProduct);

  const { trigger: deleteProduct, error: deleteError } = useSWRMutation("products", deleteById);

  const { trigger: addToWishlist, error: addToWishlistError } = useSWRMutation("users/me/products", addProductToWishlist);

  const { trigger: removeFromWishlist, error: removeFromWishlistError } = useSWRMutation("users/me/products", removeProductFromWishlist);

  const filteredProducts = useMemo(() => products.filter((p) => {
    console.log("filtering...");
    return p.title.toLowerCase().includes(search.toLowerCase());
  }), [search, products]);

  const { mutate } = useSWRConfig();

  const handleBuyProduct = async (productId) => {
    try {
      await triggerBuyProduct(productId);

      mutate("products");
    } catch (error) {

    }
  };


  return (
    <>
      <InputGroup w="50">
        <Input
          type="search"
          id="search"
          className="form-control rounded"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <InputRightElement>
          <Button
            variant="outline"
            colorScheme="primary"
            onClick={() => setSearch(text)}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
      <Box className="clearfix">
        <RouterLink to="/products/add" className="btn btn-primary float-end" data-cy="form_redirect">
          Add Product
        </RouterLink>
      </Box>
      <AsyncData loading={isLoading} error={error || deleteError || buyError || addToWishlistError || removeFromWishlistError}>
        {!error ? (
          <List
            products={filteredProducts}
            search={search}
            deleteProduct={deleteProduct}
            buyProduct={handleBuyProduct}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
          />
        ) : null}
      </AsyncData>
    </>
  );
}

export default ProductList 