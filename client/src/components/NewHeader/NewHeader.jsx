import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import styles from "./NewHeader.module.css";

const NewHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <header
      className={`${styles.header} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <nav className={styles.navbar}>
        <div className={styles.logo}>Finance Daily</div>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to={"/FinanceReact/news"} className={styles.link}>
            News
          </Link>
          <Link to="/FinanceReact/ticker" className={styles.link}>
            Ticker Search
          </Link>
          <div
            className={styles.dropdown}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={styles.dropdownButton}
            >
              <span>More</span>
              <ChevronDown size={18} />
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link to="/" className={styles.dropdownItem}>
                  Article 1
                </Link>
                <Link to="/" className={styles.dropdownItem}>
                  Article 2
                </Link>
                <Link to="/" className={styles.dropdownItem}>
                  Article 3
                </Link>
              </div>
            )}
          </div>
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
        </div>
      </nav>
    </header>
  );
};

export default NewHeader;
