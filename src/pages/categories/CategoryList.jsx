import Category from '../../components/categories/Category';
import { Flex, Box } from '@chakra-ui/react';
import useSWR from 'swr';
import { getAll } from "../../api";
import AsyncData from '../../components/AsyncData';
import { Link as RouterLink } from "react-router-dom"

const CategoryList = () => {
  const {
    data: categories = [],
    error,
    isLoading

  } = useSWR("categories", getAll)

  return (
    <>
      <Box className="clearfix">
        <div style={{ paddingLeft: '10px' }}>
          <RouterLink to="/categories/add" className="btn btn-primary" margin="5px">
            Add Category
          </RouterLink>
        </div>
      </Box>
      <AsyncData loading={isLoading} error={error}>
        {!error ? (
          <Flex wrap="wrap" mt={3}>
            {categories.map((c) => (
              <Category key={c.id} {...c} />
            ))}
          </Flex>) : null}
      </AsyncData>
    </>
  );
};

export default CategoryList;