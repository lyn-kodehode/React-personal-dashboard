import { Outlet } from "react-router-dom";
import Header from "./components/dashboard/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
