import Header from "../modules/Header";
import AddTask from "../modules/AddTask";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <AddTask />
    </>
  );
}

export default App;
