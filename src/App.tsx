import { ComponentExample } from "@/components/component-example";
import { ThemeProvider } from "./components/theme-provider";

export function App() {
  return (
    <ThemeProvider>
      <ComponentExample />
    </ThemeProvider>
  );
}

export default App;
