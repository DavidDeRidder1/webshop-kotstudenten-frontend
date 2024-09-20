import { getAll, getById } from "../../api"
import AsyncData from "../../components/AsyncData"
import useSWR from "swr"
import ProductForm from "../../components/products/ProductForm"
import { useParams } from "react-router"
import { Heading } from "@chakra-ui/react";

export default function AddOrEditProduct() {

  const { id } = useParams();

  const {
    data: product,
    error: productError,
    isLoading: productLoading

  } = useSWR(id ? `products/${id}` : null, getById)



  const {
    data: categories = [],
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useSWR("categories", getAll)

  return (
    <>
      <Heading>{id ? "Edit product" : "Add product"}</Heading>
      <AsyncData loading={categoriesLoading || productLoading} error={categoriesError || productError}>
        <ProductForm categories={categories} product={product} productId={product?.id}></ProductForm>
      </AsyncData>
    </>
  )
}