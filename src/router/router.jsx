import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import Dev from "../pages/Dev";
import Gutendex from "../components/gutendex/Gutendex";
import BookSearch from "../components/gutendex/BookSearch";
import CategoryMenu from "../components/gutendex/CategoryMenu";
import Favorites from "../components/gutendex/Favorites";
import NewsSearch from "../components/news/NewsSearch";
import NewsCategoryMenu from "../components/news/NewsCategoryMenu";
import News from "../components/news/News";
import MyNews from "../components/news/MyNews";
import Todo from "../components/todo/Todo";

export const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // {
      //   path: "dev",
      //   element: <Dev />,
      // },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "gutendex",
        element: <Gutendex />,
        children: [
          {
            index: true,
            element: <BookSearch />,
          },
          {
            path: "search",
            element: <BookSearch />,
          },
          {
            path: "categories",
            element: <CategoryMenu />,
          },
          {
            path: "favorites",
            element: <Favorites />,
          },
        ],
      },
      {
        path: "news",
        element: <News />,
        children: [
          { index: true, element: <NewsSearch /> },
          {
            path: "categories",
            element: <NewsCategoryMenu />,
          },
          {
            path: "mynews",
            element: <MyNews />,
          },
        ],
      },
      {
        path: "todo",
        element: <Todo />,
      },
    ],
  },
]);
