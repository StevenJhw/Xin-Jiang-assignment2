// index.js


import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import LifeSimulationPage from "./LifeSimulationPage"; 
import HomePage from "./HomePage";
import Credit from "./Credit";
import { LifeSimulationProvider } from './LifeSimulationContext';


const router = createBrowserRouter([
  {
    path: "/",  // HomePage
    element: <HomePage />,
  },
  {
    path: "/LifeSimulationPage",  // LifeSimulationPage
    element: <LifeSimulationPage />,
  },
  
  {
    path: "/Credit",  // Credit
    element: <Credit />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <LifeSimulationProvider>
    <RouterProvider router={router} />
    </LifeSimulationProvider>
  </React.StrictMode>
);
