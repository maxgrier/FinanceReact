import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import styles from "./NewDarkHeader.module.css";

const NewDarkHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < lastScrollY);
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
    <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>MySite</div>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/about" className={styles.link}>About</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
          <div className={styles.dropdown}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={styles.dropdownButton}
            >
              <span>More</span>
              <ChevronDown size={18} />
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link to="/services" className={styles.dropdownItem}>Services</Link>
                <Link to="/portfolio" className={styles.dropdownItem}>Portfolio</Link>
                <Link to="/blog" className={styles.dropdownItem}>Blog</Link>
              </div>
            )}
          </div>
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
      </nav>
    </header>
  );
};

export default NewDarkHeader;
