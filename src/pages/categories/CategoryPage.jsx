import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getProductsPerCategory, deleteById, buyProduct, addProductToWishlist, removeProductFromWishlist } from '../../api';
import AsyncData from '../../components/AsyncData';
import List from '../../components/products/List';
import { useState, useMemo } from 'react';
import useSWRMutation from 'swr/mutation';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';

const CategoryPage = () => {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const { id } = useParams();

  console.log(id);

  const {
    data: products = [],
    isLoading,
    error
  } = useSWR(`categories/${id}/products`, getProductsPerCategory);

  const { trigger: triggerBuyProduct, error: buyError } = useSWRMutation("products/buy", buyProduct);

  const { trigger: deleteProduct, error: deleteError } = useSWRMutation("products", deleteById);

  const { trigger: addToWishlist, error: addToWishlistError } = useSWRMutation("users/me/products", addProductToWishlist);

  const { trigger: removeFromWishlist, error: removeFromWishlistError } = useSWRMutation("users/me/products", removeProductFromWishlist);

  const filteredProducts = useMemo(() => products.filter((p) => {
    console.log("filtering...");
    return p.title.toLowerCase().includes(search.toLowerCase());
  }), [search, products]);

  console.log(products)

  const { mutate } = useSWR(`categories/${id}/products`);
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      mutate();
    } catch (error) {

    }
  };

  const handleBuyProduct = async (productId) => {
    try {
      await triggerBuyProduct(productId);
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
          <List products={filteredProducts} search={search}
            deleteProduct={handleDelete} buyProduct={handleBuyProduct} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} />
        ) : null}
      </AsyncData>
    </>
  );
};

export default CategoryPage;