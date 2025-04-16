import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap-icons/font/bootstrap-icons.css"

import {createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import { ExerciseContextProvider } from './context/ExerciseContext.jsx'
import { TranslateContextProvider } from './context/TranslateContext.jsx'
import Home from './routes/Home.jsx'
import Workouts from './routes/Workouts.jsx'
import Workout from './routes/Workout.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: "/",
      element: <Home />,
    },
  {
    path: "/workouts",
    element: <Workouts />,
  },
  {
    path: "/workout/:id",
    element: <Workout />,
  }
]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExerciseContextProvider>
      <TranslateContextProvider>
    <RouterProvider router={router} />
    </TranslateContextProvider>
    </ExerciseContextProvider>
  </StrictMode>,
)
