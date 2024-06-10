import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <>
    <Navbar />
      <div className="pages">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
