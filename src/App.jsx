import { Outlet } from "react-router-dom";
import Header from "./components/dashboard/Header";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Header />
      {/* <Dashboard /> */}
      {/* <h2 className="welcome-greetings">Welcome Back, Lyn!</h2> */}
      <Outlet />
    </>
  );
}

export default App;
