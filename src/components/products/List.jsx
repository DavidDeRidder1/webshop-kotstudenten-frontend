import { Flex } from "@chakra-ui/react"
import Product from "./Product";

export default function List({ products, search, deleteProduct, buyProduct, addToWishlist, removeFromWishlist }) {
  return (
    <Flex wrap="wrap" mt={3} data-cy="product_list">
      {products
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        .map((p) => (
          <Flex key={p.id} data-cy="product_container">
            <Product key={p.id} {...p} onDelete={deleteProduct} onBuy={buyProduct} onAddToWishlist={addToWishlist} onRemoveFromWishlist={removeFromWishlist} />
          </Flex>
        ))}
    </Flex>
  );
}
