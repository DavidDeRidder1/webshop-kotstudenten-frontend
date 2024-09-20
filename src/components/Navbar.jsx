import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { getAll } from "../api";
import useSWR from "swr";
import { useAuth } from "../contexts/Auth.context";

function Navbar() {
  const { isAuthed } = useAuth();

  const { data: categories = [], error } = useSWR("categories", getAll);
  const location = useLocation();

  return (
    <Box as="nav" className={`navbar sticky-top bg-black text-white mb-4`}>
      <Flex className="container-fluid flex-column flex-sm-row align-items-start align-items-sm-center">
        <Box className="nav-item my-2 mx-sm-3 my-sm-0">
          <ChakraLink as={Link} to="/" className="nav-link">
            Products
          </ChakraLink>
        </Box>
        <Box className="nav-item my-2 mx-sm-3 my-sm-0">
          <ChakraLink as={Link} to="/wishlist" className="nav-link">
            Wishlist
          </ChakraLink>
        </Box>
        <Box as="nav" className={`navbar sticky-top bg-black text-white mb-4`}>
          <Flex className="container-fluid flex-column flex-sm-row align-items-start align-items-sm-center">
            {categories.map(category => (
              <Box key={category.id} className="nav-item my-2 mx-sm-3 my-sm-0">
                <ChakraLink
                  as={Link}
                  to={`/categories/${category.id}`}
                  className={`nav-link ${location.pathname === `/categories/${category.id}` ? 'active' : ''}`}
                >
                  {category.name}
                </ChakraLink>
              </Box>
            ))}
            <Box flex="1" />
          </Flex>
        </Box>
        <Box className="nav-item my-2 mx-sm-3 my-sm-0">
          <ChakraLink as={Link} to="/categories" className="nav-link">
            Categories
          </ChakraLink>
        </Box>
        {
          isAuthed
            ? (
              <div className="nav-item my-2 mx-sm-3 my-sm-0">
                <Link className="nav-link" to="/logout">Logout</Link>
              </div>
            )
            : (
              <>
                <div className="nav-item my-2 mx-sm-3 my-sm-0">
                  <Link className="nav-link" to="/login">Login</Link>
                </div>
                <div className="nav-item my-2 mx-sm-3 my-sm-0">
                  <Link className="nav-link" to="/register">Register</Link>
                </div>
              </>
            )
        }
        <Box flex="1" />
      </Flex>
    </Box>
  );
}

export default Navbar;
