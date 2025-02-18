import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import RegistorForm from './pages/Registor';
import LoginForm from './pages/Login';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import CreatePage from './pages/Create';
import FavouritePage from './pages/Favourite';
import DataPage from './pages/Data';
import AccountPage from './pages/Account';
import AccountEdit from './pages/edits/editAccount';
import CreateFinalize from './pages/CreateFinal';
import PuzzlePage from './pages/Puzzle';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "register",
    element: <RegistorForm/>
  },
  {
    path: "login",
    element: <LoginForm/>
  },
  {
    path: "home",
    element: <HomePage/>
  },
  {
    path: "create",
    element: <CreatePage/>
  },
  {
    path: "search",
    element: <SearchPage/>
  },
  {
    path: "favourite",
    element: <FavouritePage/>
  },
  {
    path: "data",
    element: <DataPage/>
  },
  {
    path: "account",
    element: <AccountPage/>
  },
  {
    path: "accoEdit",
    element: <AccountEdit/>
  },
  {
    path: "creFin",
    element: <CreateFinalize/>
  },
  {
    path: "puzz/:id",
    element: <PuzzlePage/>
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
