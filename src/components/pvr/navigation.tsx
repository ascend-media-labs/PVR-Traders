import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X, ShoppingCart } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { images, navigation, materials } from "@/lib/pvr-content";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "@/components/pvr/cart-drawer";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { totalItems, totalPackets, setIsCartOpen } = useCart();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container-width nav-inner">
        <Link
          to="/"
          className="nav-brand"
          aria-label="PVR Traders home"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            className="logo-image"
            src={images.logo}
            alt="PVR Traders — Cement, Iron, Sand, Chips, Cement Bricks"
          />
        </Link>
        <nav className="nav-desktop" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-link ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav-actions">
          {/* Top Right Material Cart Button */}
          <button
            type="button"
            className="nav-cart-btn"
            aria-label={mounted && totalPackets > 0 ? `View Material Cart (${totalPackets} packets)` : "View Material Cart"}
            title="View Material Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            {mounted && totalItems > 0 && (
              <span className="nav-cart-badge" key={totalPackets}>
                {totalPackets}
              </span>
            )}
          </button>

          <Button asChild className="nav-quote">
            <Link
              to="/contact"
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Get a Quote <ArrowUpRight />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          {navigation.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Button asChild className="nav-quote">
            <Link
              to="/contact"
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Get a Quote <ArrowUpRight />
            </Link>
          </Button>
        </nav>
      )}
      <CartDrawer />
    </header>
  );
}

export function Footer() {
  const handleProductNav = (index: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("pvr_selected_product", String(index));

    if (window.location.pathname === "/services") {
      e.preventDefault();
      window.history.pushState({}, "", `/services?product=${index}#product-detail-section`);
      window.dispatchEvent(new CustomEvent("pvr_select_product", { detail: { index } }));
      const el = document.getElementById("product-detail-section");
      if (el) {
        const navHeight = 84;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = Math.max(0, elementPosition - navHeight);
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer className="site-footer">
      <div className="container-width">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              to="/"
              aria-label="PVR Traders home"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img className="footer-logo" src={images.logo} alt="PVR Traders" loading="lazy" />
            </Link>
            <p>
              Your trusted partner for quality construction materials. Building stronger
              foundations, one project at a time.
            </p>
            <div className="footer-social-wrap">
              <span className="footer-social-heading">Follow & Connect</span>
              <div className="footer-social-grid" aria-label="Official Social Channels">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919502362950?text=Hello%20PVR%20Traders,%20I%20would%20like%20to%20inquire%20about%20construction%20materials."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link social-whatsapp"
                  aria-label="WhatsApp"
                  title="Connect on WhatsApp (+91 95023 62950)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.52 3.449A11.91 11.91 0 0 0 12.062 0C5.46 0 .094 5.362.094 11.961a11.88 11.88 0 0 0 1.604 5.996L0 24l6.236-1.637a11.92 11.92 0 0 0 5.826 1.503h.005c6.6 0 11.968-5.364 11.968-11.965a11.9 11.9 0 0 0-3.515-8.452zM12.067 21.84a9.92 9.92 0 0 1-5.06-1.39l-.363-.215-3.76.986 1.004-3.665-.236-.376a9.9 9.9 0 0 1-1.52-5.22c0-5.466 4.45-9.914 9.92-9.914a9.88 9.88 0 0 1 7.02 2.906 9.88 9.88 0 0 1 2.9 7.021c-.004 5.468-4.453 9.917-9.925 9.917zm5.438-7.427c-.298-.15-1.764-.87-2.038-.97-.273-.1-.472-.15-.67.15-.198.3-.77.97-.945 1.17-.173.2-.347.224-.645.074-.298-.15-1.258-.464-2.396-1.48a8.94 8.94 0 0 1-1.658-2.064c-.174-.3-.018-.462.13-.61.135-.136.298-.35.447-.524.15-.175.2-.299.3-.498.1-.2.05-.374-.025-.524-.075-.15-.67-1.616-.92-2.215-.242-.582-.488-.503-.67-.512l-.57-.01c-.198 0-.522.075-.795.373s-1.043 1.02-1.043 2.488 1.068 2.886 1.217 3.085c.15.2 2.1 3.206 5.088 4.496.71.307 1.266.49 1.698.627.714.227 1.364.195 1.878.118.573-.086 1.764-.72 2.012-1.417.248-.696.248-1.294.174-1.418-.075-.125-.274-.2-.572-.35z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link social-instagram"
                  aria-label="Instagram"
                  title="Follow on Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link social-facebook"
                  aria-label="Facebook"
                  title="Follow on Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link social-youtube"
                  aria-label="YouTube"
                  title="Subscribe on YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link social-linkedin"
                  aria-label="LinkedIn"
                  title="Connect on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link social-x"
                  aria-label="X (formerly Twitter)"
                  title="Follow on X"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <h3>Our Products</h3>
            <ul>
              {materials.map((item, index) => (
                <li key={item.short}>
                  <a
                    href={`/services?product=${index}#product-detail-section`}
                    onClick={(e) => handleProductNav(index, e)}
                  >
                    {item.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Desk</h3>
            <ul>
              <li>
                <a href="tel:+918121277575" className="hover:text-sky-400 transition-colors">
                  +91 81212 77575
                </a>
              </li>
              <li>
                <a href="tel:+919866723820" className="hover:text-sky-400 transition-colors">
                  +91 98667 23820
                </a>
              </li>
              <li>
                <a href="mailto:pvrtraders@gmail.com" className="hover:text-sky-400 transition-colors">
                  pvrtraders@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingContactActions() {
  return (
    <div className="floating-actions" aria-label="Quick contact links">
      <a
        href="https://wa.me/919502362950?text=Hello%20PVR%20Traders,%20I%20would%20like%20to%20inquire%20about%20construction%20materials."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        aria-label="Chat on WhatsApp (+91 95023 62950)"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20.52 3.449A11.91 11.91 0 0 0 12.062 0C5.46 0 .094 5.362.094 11.961a11.88 11.88 0 0 0 1.604 5.996L0 24l6.236-1.637a11.92 11.92 0 0 0 5.826 1.503h.005c6.6 0 11.968-5.364 11.968-11.965a11.9 11.9 0 0 0-3.515-8.452zM12.067 21.84a9.92 9.92 0 0 1-5.06-1.39l-.363-.215-3.76.986 1.004-3.665-.236-.376a9.9 9.9 0 0 1-1.52-5.22c0-5.466 4.45-9.914 9.92-9.914a9.88 9.88 0 0 1 7.02 2.906 9.88 9.88 0 0 1 2.9 7.021c-.004 5.468-4.453 9.917-9.925 9.917zm5.438-7.427c-.298-.15-1.764-.87-2.038-.97-.273-.1-.472-.15-.67.15-.198.3-.77.97-.945 1.17-.173.2-.347.224-.645.074-.298-.15-1.258-.464-2.396-1.48a8.94 8.94 0 0 1-1.658-2.064c-.174-.3-.018-.462.13-.61.135-.136.298-.35.447-.524.15-.175.2-.299.3-.498.1-.2.05-.374-.025-.524-.075-.15-.67-1.616-.92-2.215-.242-.582-.488-.503-.67-.512l-.57-.01c-.198 0-.522.075-.795.373s-1.043 1.02-1.043 2.488 1.068 2.886 1.217 3.085c.15.2 2.1 3.206 5.088 4.496.71.307 1.266.49 1.698.627.714.227 1.364.195 1.878.118.573-.086 1.764-.72 2.012-1.417.248-.696.248-1.294.174-1.418-.075-.125-.274-.2-.572-.35z" />
        </svg>
        <span className="floating-tooltip">Chat with Supply Desk (+91 95023 62950)</span>
      </a>
      <a href="tel:+918121277575" className="floating-btn phone-btn" aria-label="Call Supply Desk (+91 81212 77575)">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="floating-tooltip">Call: +91 81212 77575 / +91 98667 23820</span>
      </a>
    </div>
  );
}
