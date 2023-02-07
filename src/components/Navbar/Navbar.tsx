import clsx from "clsx";
import gsap from "gsap";
import React, { useEffect } from "react";
import classes from "./styles.module.css";

const Navbar = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.set(".gsap-homepage-logo", { opacity: 0 });
    tl.to(".gsap-homepage-logo", { opacity: 1, duration: 1 });
  }, []);

  return (
    <div className={clsx(classes.root)}>
      <div className={clsx(classes.logo, "body2 gsap-homepage-logo")}>
        Tasky
      </div>
    </div>
  );
};

export default Navbar;
