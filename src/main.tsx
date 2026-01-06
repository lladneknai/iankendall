import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import { About, Contact, Code, Home, Projects, Sandbox } from "./views";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./components/App";

/**
 * ---------------------
 * BASE APPLICATION FILE
 * ---------------------
 *
 * Hello there!  ᕕ(⌐■_■)ᕗ ♪♬
 * This is the source code for my site.
 * Use the file tree to view any file in the codebase.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/code", element: <Code /> },
      { path: "/contact", element: <Contact /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:key", element: <Projects /> },
      { path: "/sandbox", element: <Sandbox /> },
    ],
    errorElement: <ErrorBoundary />,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />);
