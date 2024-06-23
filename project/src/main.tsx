import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import About from './pages/About';
import Company from './pages/Company';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Root from './pages/Root';
import Signup from './pages/Signup';
import Specialization from './pages/Specialization';
import SearchResults from './pages/SearchResults';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/specialization/:id",
        element: <Specialization />,
      },
      {
        path: "/company/:id",
        element: <Company />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/search/:search",
        element: <SearchResults />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,

  },
  {
    path: "/signup",
    element: <Signup />,
  },

]);
const queryClient = new QueryClient()

const lang = sessionStorage.getItem('lang') || 'en'
const html = document.querySelector('html')
lang === 'en' ? html?.setAttribute('dir','ltr') :  html?.setAttribute('dir','rtl')
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </QueryClientProvider>
)