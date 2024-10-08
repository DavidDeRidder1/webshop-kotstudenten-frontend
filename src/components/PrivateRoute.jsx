import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/Auth.context';
import { Box, Heading, Text } from "@chakra-ui/react";


export default function PrivateRoute() {
  const { ready, isAuthed } = useAuth();
  const { pathname } = useLocation();

  const loginPath = `/login?redirect=${pathname}`;


  if (!ready) {
    return (
      <Box className='container'>
        <Box className='row'>
          <Box className='col-12'>
            <Heading>Loading...</Heading>
            <Text>
              Please wait while we are checking your credentials and loading the
              application.
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }


  if (isAuthed) {
    return <Outlet />;
  }

  return <Navigate replace to={loginPath} />;
}
