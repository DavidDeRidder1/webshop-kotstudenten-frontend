import { getSavedProducts, deleteById, buyProduct, addProductToWishlist, removeProductFromWishlist } from "../../api/index";
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { InputGroup, Input, InputRightElement, Button, Box } from '@chakra-ui/react';
import AsyncData from '../../components/AsyncData';
import List from '../../components/products/List';

import { useState, useMemo } from 'react';

const Wishlist = () => {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const {
    data: wishlistedProducts = [],
    isLoading,
    error
  } = useSWR("users/me/products", getSavedProducts);

  const { trigger: triggerBuyProduct, error: buyError } = useSWRMutation("products/buy", buyProduct);

  const { trigger: deleteProduct, error: deleteError } = useSWRMutation("products", deleteById);

  const { trigger: addToWishlist, error: addToWishlistError } = useSWRMutation("users/me/products", addProductToWishlist);

  const { trigger: removeFromWishlist, error: removeFromWishlistError } = useSWRMutation("users/me/products", removeProductFromWishlist);

  const filteredProducts = useMemo(() => wishlistedProducts.filter((wp) => {
    console.log("filtering...");
    return wp.title.toLowerCase().includes(search.toLowerCase());
  }), [search, wishlistedProducts]);

  const { mutate } = useSWR(`users/me/products`);
  const handleBuyProduct = async (productId) => {
    try {
      await triggerBuyProduct(productId);
      mutate();
    } catch (error) {

    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      mutate();
    } catch (error) {

    }
  }

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId);
      mutate();
    } catch (error) {

    }
  }

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
      <AsyncData loading={isLoading} error={error || deleteError || buyError || addToWishlistError || removeFromWishlistError}>
        {!error ? (
          <List
            products={filteredProducts}
            search={search}
            deleteProduct={handleDeleteProduct}
            buyProduct={handleBuyProduct}
            addToWishlist={addToWishlist}
            removeFromWishlist={handleRemoveFromWishlist}
          />
        ) : null}
      </AsyncData>
    </>
  );
}

export default Wishlist 
