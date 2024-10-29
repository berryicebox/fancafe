import Layout from "./components/Layout";
import "../src/assets/styles/setting.css";
import "../src/assets/styles/reset.css";
import {QueryClient, QueryClientProvider} from "react-query";

function App() {
    const queryClient = new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Layout />
        </div>
      </QueryClientProvider>
  );
}

export default App;
