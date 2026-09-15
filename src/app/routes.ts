import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { GraphicDesign } from "./pages/GraphicDesign";
import { Photography } from "./pages/Photography";
import { CreativeConcepts } from "./pages/CreativeConcepts";
import { Contact } from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "graphic-design", Component: GraphicDesign },
      { path: "photography", Component: Photography },
      { path: "creative-concepts", Component: CreativeConcepts },
      { path: "contact", Component: Contact },
    ],
  },
]);
