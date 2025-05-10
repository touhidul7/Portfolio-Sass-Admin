import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from "./Layout/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Info from "./pages/Info.jsx";
import Experience from "./pages/Experience.jsx";
import Projects from "./pages/Projects.jsx";
import Skills from "./pages/Skills.jsx";
import Technology from "./pages/Technology.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "/experience",
        element: <Experience />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/skills",
        element: <Skills />,
      },
      {
        path: "/technology",
        element: <Technology />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
