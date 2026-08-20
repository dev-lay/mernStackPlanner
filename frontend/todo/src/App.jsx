import Header from "../modules/Header";
import AddTask from "../modules/AddTask";
import Signup from "../modules/Signup";
import Login from "../modules/Login";
import ManageAccount from "../modules/ManageAccount";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./Context";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
export default function App() {
  const { authLoading } = useContext(AuthContext);
  if (authLoading) {
    return <div>Loading application...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="*" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/todo"
          element={
            <div>
              <AddTask />
            </div>
          }
        ></Route>
        <Route path="/manageAccount" element={<ManageAccount />}></Route>
      </Routes>
    </div>
  );
}
