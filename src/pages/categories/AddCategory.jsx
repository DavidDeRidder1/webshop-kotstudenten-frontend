import AsyncData from "../../components/AsyncData";
import CategoryForm from "../../components/categories/CategoryForm";
import { Heading } from "@chakra-ui/react";
import useSWRMutation from 'swr/mutation';
import { addCategory } from '../../api';

export default function AddCategory() {

  const {
    trigger: saveCategory,
    error: saveError,
  } = useSWRMutation('categories', addCategory);

  return (
    <>
      <Heading>Add Category</Heading>
      <AsyncData error={saveError}>
        <CategoryForm saveCategory={saveCategory} />
      </AsyncData>
    </>
  );
};

