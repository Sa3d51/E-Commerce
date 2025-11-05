import "./App.css";

import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Home from './components/Home/Home';
import Layout from "./components/Layout/Layout";
import Parent from "./components/Parent/Parent";
import { createHashRouter, RouterProvider } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Gallery from './components/Gallary/Gallery';

let _router = createHashRouter([  
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "parent", element: <Parent /> },
      { path: "gallery", element: <Gallery /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={_router} />;
}

export default App;
