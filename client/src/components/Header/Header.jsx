import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

export default function Header() {
  const [headerClass, setHeaderClass] = useState("headerOuter active");

  let lastScrollTop = 0;

  const onScroll = () => {
    let y = window.scrollY;
    var st1 = window.pageYOffset || document.documentElement.scrollTop;
    setTimeout(() => {
      var st2 = window.pageYOffset || document.documentElement.scrollTop;

      console.log("scrolling", window.scrollY, st1, st2);
      let last = "down";
      if (st1 < st2) {
        // downscroll code
        console.log("scroll down");
        setHeaderClass("headerOuter");
        last = "down";
      } else if (st1 > st2) {
        // upscroll code
        console.log("scroll up");
        setHeaderClass("headerOuter active");
        last = "up";
      } else {
        if (last === "down") {
          setHeaderClass("headerOuter");
        } else {
          setHeaderClass("headerOuter active");
        }
      }

      // else was horizontal scroll
      // if(y<=63){
      //     console.log('change to active', window.scrollY, st)
      //     setHeaderClass('headerOuter active')
      // } else{
      //     console.log('change to inactive', window.scrollY)
      //     setHeaderClass('headerOuter')
      // }
      // lastScrollTop = st <= 0 ? 0 : st;
    }, 100);
  };

//   window.addEventListener("scroll", onScroll)

  // render() {
  return (
    // <div className={headerClass}>
    <div className={classes.headerOuter}>
      <div>Finance Daily</div>

      <div className={classes.bottomDiv}>
        <div className={classes.link}>
          <NavLink to={"/"}>Home</NavLink>
        </div>
        <div className={classes.link}>
          <NavLink to={"/FinanceReact/ticker"}>Ticker Search</NavLink>
        </div>
        <div className={classes.link}>
          <NavLink to={"/FinanceReact/news"}>News</NavLink>
        </div>
        <div className={classes.link}>
          <NavLink to={"/FinanceReact/news"}>Blogs</NavLink>
        </div>
        {/* <div className='rightDiv'>
                        Hello, {this.state.name}
                    </div> */}
      </div>
    </div>
  );
  // }
}
