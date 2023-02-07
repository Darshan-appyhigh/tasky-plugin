import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import classes from "./Loading.module.css";
import gsap from "gsap";
import pageContext from "../../context/pageContext";
import { pages } from "../../contants/page";

const Loading = () => {
  const { setActivePage } = useContext(pageContext);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.set(".gsap-loading-l", { display: "inline-block" });
    tl.from(`.gsap-loading-title`, { duration: 1, y: "100%", opacity: 0 })
      .from(`.gsap-loading-subtitle , .gsap-loading-bottom`, {
        duration: 1,
        opacity: 0,
      })
      .to(`.gsap-loading-l`, {
        duration: 1,
        rotate: 360,
        repeat: 3,
        repeatDelay: 0.7,
        onComplete: () => {
          setActivePage(pages.HOME);
        },
      });
  }, []);

  return (
    <div
      className={clsx(
        classes.root,
        "d-flex flex-column justify-content-between"
      )}
    >
      <div className={clsx(classes.top)}>&nbsp;</div>
      <div className={clsx(classes.center)}>
        <div
          className={clsx(classes.title, "gsap-loading-title text-center h2")}
        >
          <span className="gsap-loading-l">L</span>oading...
        </div>
        <div
          className={clsx(
            classes.subtitle,
            "gsap-loading-subtitle text-center body2 text-grey"
          )}
        >
          Tasky - Let's Get Things Done.
        </div>
      </div>
      <div
        className={clsx(
          classes.bottom,
          "gsap-loading-bottom text-center body2"
        )}
      >
        by Darshan Shah
      </div>
    </div>
  );
};

export default Loading;
