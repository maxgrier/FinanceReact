import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import styles from "./NewHeader.module.css";

const NewHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      </nav>
    </header>
  );
};

export default NewHeader;
