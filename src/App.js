import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import router from "./router";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify"
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose="3000" theme="dark" />
    </Provider>
  );
}

export default App;
