import React, { useState, useEffect } from "react";
import styles from "./FinanceApp.module.css";

const FinanceApp = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Apply dark mode to the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>FinancePro</div>
        <nav className={styles.nav}>
          <a href="#">Dashboard</a>
          <a href="#">Portfolio</a>
          <a href="#">Settings</a>
        </nav>

        {/* Dark Mode Toggle */}
        <div className={styles.toggleContainer}>
          <span>☀️</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className={styles.slider}></span>
          </label>
          <span>🌙</span>
        </div>
      </header>

      {/* Dashboard */}
      <div className={styles.dashboard}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Total Balance</div>
          <div className={styles.cardValue}>$25,400</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Investments</div>
          <div className={styles.cardValue}>$10,200</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Savings</div>
          <div className={styles.cardValue}>$5,000</div>
        </div>
      </div>

      {/* Example Button */}
      <button className={styles.button}>View Details</button>
    </div>
  );
};

export default FinanceApp;
