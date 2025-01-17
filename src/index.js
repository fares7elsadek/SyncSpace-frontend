import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './compenents/Navbar';
import Register from './pages/Register';
import { ToastContainer } from "react-toastify";
import Login from './pages/Login';
import RoomPage from './pages/Room';
import ErrorPage from './pages/ErrorPage';
import CreateRoomPage from './pages/CreateRoom';
import JoinRoomPage from './pages/JoinRoom';
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './compenents/ProtectedRoute';



const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path:"/",
    element:(
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement:<ErrorPage/>
  },
  {
    path:"register",
    element:<Register/>
  },
  {
    path:"login",
    element:<Login />
  },
  {
    path:"room/:roomId",
    element:(
      <ProtectedRoute>
        <RoomPage />
      </ProtectedRoute>
    )
  },
  {
    path:"/new-room",
    element:(
      <ProtectedRoute>
        <CreateRoomPage />
      </ProtectedRoute>
    )
  },
  {
    path:"/join-room",
    element:(
      <ProtectedRoute>
        <JoinRoomPage />
      </ProtectedRoute>
    )
  }
])

root.render(
  <React.StrictMode>
    <Navbar/>
    <RouterProvider router={router}/>
    <ToastContainer 
        theme="dark"
        toastClassName={({ type }) =>
          type === "success" ? "toast-container toast-success" : 
          type === "error" ? "toast-container toast-error" : 
          "toast-container"
        }
      />
  </React.StrictMode>
);


reportWebVitals();
