import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import { Home, NewChat } from "./pages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chat/:conversationId" element={<NewChat />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
