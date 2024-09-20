import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Image, Button, ButtonGroup, Flex, Divider } from '@chakra-ui/react'
import { memo, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom"



export default memo(function Product({ id, title, picture, description, price, category, onDelete, user, bought, onBuy, onAddToWishlist, onRemoveFromWishlist }) {

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleBuy = useCallback(() => {
    onBuy(id);

  }, [id, onBuy])

  const handleAddToWishlist = useCallback(() => {
    onAddToWishlist(id);
  }, [id, onAddToWishlist])

  const handleRemoveFromWishlist = useCallback(() => {
    onRemoveFromWishlist(id);
  }, [id, onRemoveFromWishlist])



  console.log("Rendering Product");
  return (
    <Card maxW="sm" margin="5" data-cy="product_card">
      <CardHeader maxHeight={250}>
        <Image src={`${picture}`} alt="test" maxHeight={250} />
      </CardHeader>

      <CardBody >
        <Stack mt="6" spacing="1">
          <Flex justify="space-between" align="center">
            <Heading size="md" data-cy="product_title">{title}</Heading>
            <RouterLink variant="outline" to={`/products/edit/${id}`} style={{
              color: bought ? 'gray' : 'blue',
              textDecoration: 'underline',
              pointerEvents: bought ? 'none' : 'auto',
              opacity: bought ? 0.6 : 1,
            }}>Edit</RouterLink>
          </Flex>
          <Text data-cy="product_description">
            {description}
          </Text>
          <Text data-cy="product_user">
            Posted by: {user.name}
          </Text>
          <Text data-cy="product_category">
            {category ? category.name : 'Category Not Found'}
          </Text>
          <Text color="green.300" fontSize="2xl" data-cy="product_price">
            € {price}
          </Text>
          <Text fontSize="2xl" data-cy="product_bought">
            {bought === false ? "For sale" : "Bought"}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter >
        <Stack direction="column">
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' onClick={handleBuy} disabled={bought} data-cy="product_add_btn">
              Buy now
            </Button>
            <Button variant='solid' colorScheme='red' onClick={handleDelete} disabled={bought} data-cy="product_remove_btn">Remove</Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button variant='ghost' colorScheme='blue' onClick={handleAddToWishlist} disabled={bought}>
              Add to wishlist
            </Button>
            <Button variant='ghost' colorScheme='red' onClick={handleRemoveFromWishlist}>Remove from wishlist</Button>
          </ButtonGroup>
        </Stack>

      </CardFooter>
    </Card>


  );
});
