import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { MULTI, ROUTES } from "../constants";

function BreadCrumbs() {
  const { pathname } = useLocation();

  return (
    <section className="flex py-5 italic">
      <p
        className={clsx(
          pathname === `/${ROUTES.MULTI}/${MULTI.START}` && "text-lime-300"
        )}
      >
        start
      </p>
      <span>&nbsp;&gt;&nbsp;</span>
      <p
        className={clsx(
          pathname === `/${ROUTES.MULTI}/${MULTI.STEP1}` && "text-lime-300"
        )}
      >
        step1
      </p>
      <span>&nbsp;&gt;&nbsp;</span>
      <p
        className={clsx(
          pathname === `/${ROUTES.MULTI}/${MULTI.STEP2}` && "text-lime-300"
        )}
      >
        step2
      </p>
      <span>&nbsp;&gt;&nbsp;</span>
      <p
        className={clsx(
          pathname === `/${ROUTES.MULTI}/${MULTI.STEP3}` && "text-lime-300"
        )}
      >
        step3
      </p>
      <span>&nbsp;&gt;&nbsp;</span>
      <p
        className={clsx(
          pathname === `/${ROUTES.MULTI}/${MULTI.STEP4}` && "text-lime-300"
        )}
      >
        step4
      </p>
      <span>&nbsp;&gt;&nbsp;</span>
      <p
        className={clsx(
          pathname === `/${ROUTES.MULTI}/${MULTI.RESULT}` && "text-lime-300"
        )}
      >
        result
      </p>
    </section>
  );
}

export default BreadCrumbs;
