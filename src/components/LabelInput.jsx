import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export default function LabelInput({ label, name, type, validationRules, ...rest }) {
  const { register, formState: { errors, isSubmitting } } = useFormContext();

  return (
    <FormControl mb={3}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...register(name, validationRules)}
        defaultValue=""
        id={name}
        type={type}
        {...rest}
      />
      {errors[name] ? <p className="form-text text-danger" data-cy="label_input_error">{errors[name].message}</p> : null}
    </FormControl>
  )
}