import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import { ErrorBoundary } from "./app/components/ErrorBoundary";
import { ThemeProvider } from "./app/context/ThemeContext";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
