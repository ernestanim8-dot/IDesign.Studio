import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import { Preloader } from "./app/components/Preloader";

export default function App() {
  return <><Preloader /><RouterProvider router={router} /></>;
}
