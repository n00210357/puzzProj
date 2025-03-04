//imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//the pages
import App from './App';
import RegistorForm from './pages/Registor';
import LoginForm from './pages/Login';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import CreatePage from './pages/Create';
import FavouritePage from './pages/Favourite';
import BugPage from './pages/Bug';
import AccountPage from './pages/Account';
import AccountEdit from './pages/edits/editAccount';
import CreateFinalize from './pages/CreateFinal';
import PuzzlePage from './pages/Puzzle';
import YourPuzzlePage from './pages/YourPuzzles';
import EditPuzzlePage from './pages/EditPuzzle';

const router = createBrowserRouter([
  //start page
  {    path: "/",    element: <App/>,  },
  
  //registor page
  {    path: "register",    element: <RegistorForm/>  },

  //login page
  {    path: "login",    element: <LoginForm/>  },

  //home page
  {    path: "home",    element: <HomePage/>  },

  //create page
  {    path: "create",    element: <CreatePage/>  },

  //search page
  {    path: "search",    element: <SearchPage/>  },

  //favourite page
  {    path: "favourite",    element: <FavouritePage/>  },

  //bug page
  {    path: "bug",    element: <BugPage/>  },

  //account oage
  {    path: "account",    element: <AccountPage/>  },

  //account edit page
  {    path: "accoEdit",    element: <AccountEdit/>  },

  //create finalize page
  {    path: "creFin",    element: <CreateFinalize/>  },

  //puzzle page
  {    path: "puzz/:id",    element: <PuzzlePage/>  },

  //your puzzles page
  {    path: "yourPuzzles",    element: <YourPuzzlePage/>  },

  //your puzzles page
    {    path: "editPuzz/:id",    element: <EditPuzzlePage/>  },
])

//root creator
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
