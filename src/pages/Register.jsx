import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../contexts/Auth.context';
import { VStack, Button } from '@chakra-ui/react';
import Error from '../components/Error';
import LabelInput from '../components/LabelInput';

export default function Register() {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({ firstName, lastName, email, password }) => {
      const loggedIn = await register({ firstName, lastName, email, password });

      if (loggedIn) {
        navigate({
          pathname: '/',
          replace: true,
        });
      }
    },
    [register, navigate]
  );

  const validationRules = useMemo(() => ({
    firstName: {
      required: 'First name is required',
    },
    lastName: {
      required: 'Last name is required',
    },
    email: {
      required: 'Email is required',
    },
    password: {
      required: 'Password is required',
    },
    confirmPassword: {
      required: 'Password confirmation is required',
      validate: (value) => {
        const password = getValues('password');
        return password === value || 'Passwords do not match';
      },
    },
  }), [getValues]);

  return (
    <FormProvider {...methods}>
      <VStack as="form" spacing={4} onSubmit={handleSubmit(handleRegister)} width="100%">
        <h1>Register</h1>

        <Error error={error} />

        <LabelInput
          label='First Name'
          type='text'
          name='firstName'
          placeholder='Your First Name'
          validationRules={validationRules.firstName}
          data-cy="register_firstName"
        />

        <LabelInput
          label='Last Name'
          type='text'
          name='lastName'
          placeholder='Your Last Name'
          validationRules={validationRules.lastName}
          data-cy="register_lastName"
        />

        <LabelInput
          label='Email'
          type='text'
          name='email'
          placeholder='your@email.com'
          validationRules={validationRules.email}
          data-cy="register_email"
        />

        <LabelInput
          label='Password'
          type='password'
          name='password'
          validationRules={validationRules.password}
          data-cy="register_password"
        />

        <LabelInput
          label='Confirm password'
          type='password'
          name='confirmPassword'
          validationRules={validationRules.confirmPassword}
          data-cy="register_confirm_password"
        />

        <div className='clearfix'>
          <div className='btn-group float-end'>
            <Button
              type='submit'
              colorScheme='blue'
              isLoading={loading}
              data-cy="register_submit"
            >
              Register
            </Button>

            <Button
              type='button'
              colorScheme='gray'
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </VStack>
    </FormProvider>
  );
}
