import { Outlet } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";

function Multi() {
  return (
    <>
      <h2 className="text-3xl py-5">Multi-Step-form</h2>
      <BreadCrumbs />
      <Outlet />
    </>
  );
}

export default Multi;
