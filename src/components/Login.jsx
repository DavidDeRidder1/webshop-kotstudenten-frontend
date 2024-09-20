import { FormProvider, useForm } from 'react-hook-form';
import { Container, Flex, Button } from '@chakra-ui/react';
import LabelInput from '../components/LabelInput';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth.context';
import Error from '../components/Error';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();


  const methods = useForm({
    defaultValues: {
      email: "david.deridder@student.hogent.be",
      password: "12345678"
    }
  });

  const { handleSubmit, reset } = methods;


  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);


  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);

      if (loggedIn) {
        navigate({
          pathname: "/",
          replace: true,
        });
      }
    },
    [login, navigate]
  );

  return (
    <FormProvider {...methods}>
      <Container maxW="sm">
        <form onSubmit={handleSubmit(handleLogin)}>
          <h1>Sign in</h1>

          <Error error={error} />

          <LabelInput
            label='email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
            data-cy="email_input"
          />

          <LabelInput
            label='password'
            type='password'
            name='password'
            validationRules={validationRules.password}
            data-cy="password_input"
          />

          <Flex justify="flex-end" mt={4}>
            <Button type='submit' colorScheme="blue" mr={3} disabled={loading} data-cy="submit_login">
              Sign in
            </Button>

            <Button type='button' variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </Flex>
        </form>
      </Container>
    </FormProvider>
  );
}
