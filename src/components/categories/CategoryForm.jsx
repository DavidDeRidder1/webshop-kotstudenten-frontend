import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { memo } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';



const validationRules = {
  name: {
    required: 'Category name is required',
  },
};

export default memo(function CategoryForm({ saveCategory }) {

  const navigate = useNavigate();

  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = useCallback(async (data) => {
    const { name } = data;
    console.log(name);
    await saveCategory({ name });
    navigate("/categories");
  }, [saveCategory, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mb-3">
      <FormControl mb={3}>
        <FormLabel htmlFor="name">Category Name</FormLabel>
        <Input
          {...register('name', validationRules.name)}
          id="name"
          type="text"
          required
        />
        {errors.name && (
          <p className="form-text text-danger">{errors.name.message}</p>
        )}
      </FormControl>

      <Button type="submit" colorScheme="blue" disabled={isSubmitting}>
        Add Category
      </Button>
    </form>
  );
});
