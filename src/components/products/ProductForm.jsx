import { useEffect, useCallback } from 'react';
import { FormControl, FormLabel, Textarea, Select, Button } from '@chakra-ui/react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { memo } from "react";
import useSWRMutation from 'swr/mutation';
import { save } from '../../api';
import Error from '../Error';
import { useNavigate } from 'react-router';
import LabelInput from '../LabelInput';

const validationRules = {
  title: {
    required: "Title is required"
  },
  description: {
    required: "Description is required",
    minLength: { value: 2, message: "The description has to contain at least 2 characters" }
  },
  image: {
    required: "Image is required"
  },
  price: {
    valueAsNumber: true,
    required: "Price is required",
    min: { value: 0.01, message: "Price has to be higher than 0" }
  },
  category: {
    required: "Category is required"
  },
  user: {
    required: "User is required",
    min: { value: 1, message: 'min 1' },
  }
}

function CategoriesSelect({ name, categories }) {
  const { register, errors, isSubmitting } = useFormContext();

  return (

    <FormControl mb={3}>
      {console.log(categories)}
      <FormLabel htmlFor={name}>Category</FormLabel>
      <Select
        {...register(name)}
        id={name}
        disabled={isSubmitting}
      >
        {categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}


export default memo(function ProductForm({ product, categories, productId }) {

  const navigate = useNavigate();

  const {
    trigger: saveProduct,
    error: saveError,
  } = useSWRMutation('products', save);

  const methods = useForm();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = methods;



  const onSubmit = useCallback(async (data) => {
    console.log(JSON.stringify(data));
    const { title, description, picture, price, categoryId } = data;

    console.log(title);
    await saveProduct({ title, description, picture, price: parseFloat(price), categoryId, id: productId });

    navigate("/products", { replace: true });
  }, [reset, saveProduct, navigate, productId])

  useEffect(() => {

    if (product && (Object.keys(product).length !== 0 || product.constructor !== Object)) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("picture", product.picture);
      setValue("price", product.price);
      setValue("categoryId", product.category.id);

    }
    else {
      reset();
    }
  }, [product, setValue, reset])


  console.log(product);
  return (
    <>

      <Error error={saveError} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>
          <LabelInput
            label="Title"
            name="title"
            type="text"
            validationRules={validationRules.title}
            data-cy="title_input" />
          <FormControl mb={3}>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Textarea
              {...register("description", validationRules.description)}
              defaultValue=""
              id='description'
              required
              data-cy="description_input"
            />
            {errors.description ? <p className="form-text text-danger" data-cy="description_input_error">{errors.description.message}</p> : null}
          </FormControl>
          <LabelInput
            label="Image"
            name="picture"
            type="url"
            validationRules={validationRules.image}
            data-cy="picture_input" />
          <LabelInput
            label="Price"
            name="price"
            type="number"
            validationRules={validationRules.price}
            data-cy="price_input" />

          <CategoriesSelect name="categoryId" categories={categories} data-cy="category_input" />

          <Button type='submit' colorScheme='blue' disabled={isSubmitting} data-cy="submit_product">

            {product?.id ? "Edit product" : "Add product"}
          </Button>

        </form>
      </FormProvider>
    </>
  );
})
