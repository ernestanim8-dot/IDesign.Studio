import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Home } = await import("./pages/Home");
          return { Component: Home };
        },
      },
      {
        path: "graphic-design",
        lazy: async () => {
          const { GraphicDesign } = await import("./pages/GraphicDesign");
          return { Component: GraphicDesign };
        },
      },
      {
        path: "photography",
        lazy: async () => {
          const { Photography } = await import("./pages/Photography");
          return { Component: Photography };
        },
      },
      {
        path: "creative-concepts",
        lazy: async () => {
          const { CreativeConcepts } = await import("./pages/CreativeConcepts");
          return { Component: CreativeConcepts };
        },
      },
      {
        path: "contact",
        lazy: async () => {
          const { Contact } = await import("./pages/Contact");
          return { Component: Contact };
        },
      },
    ],
  },
]);
