import { RouterProvider } from "react-router-dom";
import router from "./route";

function App() {
  return (
    <div>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </div>
  );
}

export default App;
