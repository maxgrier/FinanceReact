import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import classes from "./Line.module.css";

const selectorOptions = {
  buttons: [
    { step: "month", stepmode: "backward", count: 1, label: "1m" },
    { step: "month", stepmode: "backward", count: 6, label: "6m" },
    { step: "year", stepmode: "todate", count: 1, label: "YTD" },
    { step: "year", stepmode: "backward", count: 1, label: "1y" },
    { step: "year", stepmode: "backward", count: 5, label: "5y" },
    { step: "all" },
  ],
};

const LineFunc = ({ ticker }) => {
  const [data, setData] = useState({});
  const [trace, setTrace] = useState({ x: [], y: [], fill: "tonexty", type: "scatter", mode: "line" });
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true"); // Sync with localStorage
  const [colors, setColors] = useState({ bgColor: "#ffffff", textColor: "#000000" });

  const [layout, setLayout] = useState({
    title: `${ticker.toUpperCase()} Monthly`,
    xaxis: {
      rangeselector: {
        buttons: selectorOptions.buttons,
        bgcolor: "#333", // Background color of all buttons
        bordercolor: "#555", // Border color
        activecolor: "#ff9900", // Color of the active button
        font: { color: "#fff" }, // Text color
      },
      rangeslider: { autorange: true },
      range: ["2010", "2015"],
    },
    yaxis: { fixedrange: true },
    autosize: true,
    margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 },
    paper_bgcolor: "whitesmoke",
    plot_bgcolor: "lightgrey",
    modebar: { width: 50 },
  });

  // Fetch Data
  const getDataNew = async (url) => {
    try {
      let response = await fetch("/yahoo", {
        method: "POST",
        body: JSON.stringify({ ticker: url }),
        headers: { "Content-Type": "application/json" },
      });

      let data2 = await response.json();
      setData(data2);
      splitDataNew(data2);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Process and update chart data
  const splitDataNew = (data) => {
    let tempX = data.map((item) => item.date);
    let tempY = data.map((item) => item.close);
    
    setMinDate(tempX[0]);
    setMaxDate(tempX[tempX.length - 1]);
    
    setTrace((prevTrace) => ({ ...prevTrace, x: tempX, y: tempY }));

    setLayout((prevLayout) => ({
      ...prevLayout,
      xaxis: { ...prevLayout.xaxis, range: [tempX[0], tempX[tempX.length - 1]] },
    }));
  };

  // Update colors based on theme
  const updateColors = () => {
    // const darkColors = { textColor: "#ffffff", bgColor: "#1e1e1e" };
    const darkColors = { textColor: "#ffffff", bgColor: "#2b2b3c" };
    
    const lightColors = { textColor: "#000000", bgColor: "#ffffff" };

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setDarkMode(isDark);
    setLayout((prevLayout) => ({
        ...prevLayout,
        xaxis: {
          ...prevLayout.xaxis,
          rangeselector: {
            ...prevLayout.xaxis.rangeselector,
            bgcolor: isDark ? "#222" : "#ddd",
            bordercolor: isDark ? "#444" : "#888",
            activecolor: isDark ? "#ff9900" : "#ff6600",
            font: { color: isDark ? "#fff" : "#000" },
          },
        },
      }));
    setColors(isDark ? darkColors : lightColors);
    console.log('dark mode ', darkMode)
  };

  // Fetch data on component mount
  useEffect(() => {
    getDataNew(ticker);
  }, [ticker]);

  // Update colors when darkMode changes
  useEffect(() => {
    updateColors();
  }, [darkMode]);

// Detect dark mode from localStorage & <html data-theme>
useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      setDarkMode(isDark);
      updateColors(isDark);
    };

    checkDarkMode();

    // 1️⃣ Listen for changes to localStorage (from other tabs)
    const handleStorageChange = (event) => {
      if (event.key === "darkMode") {
        checkDarkMode();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // 2️⃣ Watch for changes to <html data-theme> (same tab updates)
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  return (
      <div className={`${classes.chart} ${darkMode ? classes.darkMode : classes.lightMode}`}>
      <Plot
        data={[trace]}
        layout={{
          ...layout,
          paper_bgcolor: colors.bgColor,
          plot_bgcolor: colors.bgColor,
          font: { color: colors.textColor },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LineFunc;
