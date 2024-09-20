import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import ProductList from './pages/products/ProductList'
import CategoryList from './pages/categories/CategoryList'
import { ChakraProvider } from '@chakra-ui/react'
import AddOrEditProduct from './pages/products/AddOrEditProduct'
import Wishlist from './pages/products/Wishlist'
import CategoryPage from './pages/categories/CategoryPage'
import { AuthProvider } from './contexts/Auth.context';
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute';
import Logout from './pages/Logout';
import Register from './pages/Register';
import AddCategory from './pages/categories/AddCategory'

const router = createBrowserRouter([
  {

    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/products" replace />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: "/products",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <ProductList />
          },
          {
            path: "add",
            element: <AddOrEditProduct />
          },
          {
            path: "edit/:id",
            element: <AddOrEditProduct />
          }
        ]
      },
      {
        path: "/wishlist",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Wishlist />
          }
        ]
      },
      {
        path: "/categories/:id",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <CategoryPage />
          }
        ]

      },
      {
        path: "/categories",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <CategoryList />
          },
          {
            path: "add",
            element: <AddCategory />
          }
        ]

      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)
