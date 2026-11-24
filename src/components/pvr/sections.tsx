import { useEffect, useRef, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Headset,
  Check,
  Building2,
  Package,
  Layers3,
  Waves,
  Pickaxe,
  BrickWall,
  HardHat,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Handshake,
  BadgeDollarSign,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductDetailSection } from "@/components/pvr/product-detail-section";
import {
  images,
  heroSlides,
  materials,
  carouselItems,
  projects,
  contact,
  getContactSubmissionResult,
  clientPartners,
  clientStats,
  clientBrands,
} from "@/lib/pvr-content";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "50px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}
export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = heroSlides.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const slide = heroSlides[current] ?? heroSlides[0]!;

  return (
    <>
      <section
        id="home"
        className="hero"
        aria-label="Construction Materials & Projects Carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="hero-slider-bg-wrap">
          {heroSlides.map((item, idx) => (
            <img
              key={item.id}
              className={`hero-slide-bg ${idx === current ? "active" : ""}`}
              src={item.image}
              alt={item.alt}
              loading={idx === 0 ? "eager" : "lazy"}
              fetchPriority={idx === 0 ? "high" : "auto"}
            />
          ))}
        </div>

        <button
          type="button"
          className="hero-arrow hero-arrow-left"
          onClick={prevSlide}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          className="hero-arrow hero-arrow-right"
          onClick={nextSlide}
          aria-label="Next image"
        >
          <ChevronRight />
        </button>

        <div className="container-width hero-copy">
          <div className="hero-slide-badge">
            <span className="hero-badge-pulse" />
            <span className="hero-badge-company">PVR TRADERS</span>
            <span className="hero-badge-sep" />
            <HardHat />
            <span>{slide.badge}</span>
          </div>
          <h1 key={`title-${current}`}>
            {slide.title.map((line, i) => (
              <span key={i} className={i === slide.title.length - 1 ? "hero-highlight" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <p key={`desc-${current}`}>
            {slide.description}
          </p>
          <div className="hero-buttons">
            <Button variant="hero" size="lg" className="hero-btn-primary" asChild>
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Explore Our Products <ArrowUpRight />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="hero-btn-secondary" asChild>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Contact Us <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="hero-trust-pills">
            <div className="hero-trust-item">
              <BadgeCheck /> <span>100% Quality Tested</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <Truck /> <span>Direct Site Delivery</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <ShieldCheck /> <span>Certified High Strength</span>
            </div>
          </div>
        </div>

        <div className="container-width hero-caption">
          <div className="hero-caption-left">
            <ShieldCheck /> Built on quality. Driven by trust.
          </div>
          <span className="hero-index-capsule">{slide.tag}</span>

          <div className="hero-indicators">
            <span className="hero-counter">
              <span className="hero-counter-current">0{current + 1}</span>
              <span className="hero-counter-sep">/</span>
              <span className="hero-counter-total">0{total}</span>
            </span>
            <div className="hero-dots-wrap">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`hero-dot ${idx === current ? "active" : ""}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  aria-current={idx === current ? "true" : "false"}
                >
                  <span className="hero-dot-bar" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <TrustStrip />
    </>
  );
}
const trustFeatures = [
  { icon: ShieldCheck, title: "Quality Assured", description: "Materials you can trust" },
  { icon: Truck, title: "Reliable Supply", description: "Ready for your requirements" },
  { icon: BadgeCheck, title: "Competitive Pricing", description: "Value in every delivery" },
  { icon: Headset, title: "Customer First", description: "Support at every step" },
];
function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="container-width trust-grid">
        {trustFeatures.map(({ icon: Icon, title, description }) => (
          <div className="trust-item" key={title}>
            <Icon />
            <div>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function MaterialsCarousel() {
  return (
    <section id="products" className="section-space materials-section" aria-label="Products">
      <Reveal className="container-width">
        <div className="section-header items-end">
          <div className="min-w-0">
            <div className="premium-section-badge mb-2">
              <span className="badge-glow-dot" />
              <span>Products</span>
            </div>
            <h2 className="section-heading">Products</h2>
            <p className="section-description">
              High-strength certified construction materials supplied with dependable on-site logistics.
            </p>
          </div>
          <Link
            className="header-discuss-pill"
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>Explore Specs</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="products-single-row-grid">
          {carouselItems.map((item, index) => {
            const isCement = item.title === "Cement Supply" || index === 0;
            return (
              <div
                className="material-card-premium group cursor-pointer"
                key={item.title}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("pvr_selected_product", String(index));
                    window.location.href = "/services#product-detail-section";
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("pvr_selected_product", String(index));
                      window.location.href = "/services#product-detail-section";
                    }
                  }
                }}
              >
                <div className="material-card-image-wrap">
                  <img
                    src={item.image}
                    alt={`${item.title} construction materials`}
                    loading="lazy"
                    className="material-card-img"
                  />
                  <div className="material-card-overlay" />
                </div>

                {/* Top Floating Glass Info */}
                <div className="material-card-top">
                  <span className="material-index-chip">
                    <span className="chip-num">0{index + 1}</span>
                    <span className="chip-divider" />
                    <span className="chip-tag">{item.short}</span>
                  </span>
                  <div className="material-float-arrow">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Content Scrim */}
                <div className="material-card-content">
                  <div className="material-spec-pill">
                    <span className="spec-dot" />
                    <span>{item.spec}</span>
                  </div>
                  <h3 className="material-card-title">{item.title}</h3>
                  <p className="material-card-description">{item.description}</p>

                  <div className="material-card-footer">
                    <span className="material-explore-link">
                      <span>Explore Material Specs</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
export function About() {
  return (
    <section id="about" className="about-section bg-secondary" aria-label="About PVR Traders">
      <Reveal className="container-width about-grid">
        <div className="about-image-wrap">
          <div className="about-image">
            <img
              src={images.site}
              alt="Architect reviewing structural blueprints and construction plans"
              loading="lazy"
            />
            <div className="about-glass-badge">
              <div className="about-badge-icon">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="about-badge-text">
                <strong>A Strong Foundation Starts With Trust</strong>
                <span>Certified Materials • Consistent Quality • Timely Supply</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-copy">
          <div className="premium-section-badge mb-2.5">
            <span className="badge-glow-dot" />
            <span>About PVR Traders</span>
          </div>

          <h2 className="about-heading">
            More than materials.
            <br />
            A partner in your progress.
          </h2>

          <p className="about-lead">
            PVR Traders supplies certified, high-grade construction materials across residential, commercial, and infrastructure builds. We combine dependable material grading with transparent pricing and prompt on-site delivery.
          </p>

          <div className="about-features-grid">
            <div className="about-feature-item">
              <div className="feature-icon-pill">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Certified Quality Assurance</span>
            </div>
            <div className="about-feature-item">
              <div className="feature-icon-pill">
                <Truck className="w-4 h-4" />
              </div>
              <span>Timely On-Site Logistics</span>
            </div>
            <div className="about-feature-item">
              <div className="feature-icon-pill">
                <Handshake className="w-4 h-4" />
              </div>
              <span>Transparent & Fair Pricing</span>
            </div>
            <div className="about-feature-item">
              <div className="feature-icon-pill">
                <BadgeCheck className="w-4 h-4" />
              </div>
              <span>End-to-End Civil Supply</span>
            </div>
          </div>

          <div className="about-action-row">
            <Link
              to="/contact"
              className="about-cta-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>Let’s Talk About Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="about-trust-chip">
              <span className="trust-dot" />
              <span>Direct Supplier Network</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
const serviceIcons = [Package, Layers3, Waves, Pickaxe, BrickWall];
interface ServicesProps {
  isStandalonePage?: boolean;
}

export function Services({ isStandalonePage = false }: ServicesProps) {
  const [isServicesRoute, setIsServicesRoute] = useState(isStandalonePage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsServicesRoute(isStandalonePage || window.location.pathname.startsWith("/services"));
    }
  }, [isStandalonePage]);

  const [selectedProductIndex, setSelectedProductIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("pvr_selected_product");
      if (saved !== null && !isNaN(Number(saved))) {
        return Number(saved);
      }
    }
    return 2;
  });

  useEffect(() => {
    if (typeof window !== "undefined" && isServicesRoute) {
      const saved = sessionStorage.getItem("pvr_selected_product");
      if (saved !== null && !isNaN(Number(saved))) {
        setSelectedProductIndex(Number(saved));
        sessionStorage.removeItem("pvr_selected_product");
        setTimeout(() => {
          const el = document.getElementById("product-detail-section");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
    }
  }, [isServicesRoute]);

  const handleSelectProduct = (index: number) => {
    if (!isServicesRoute) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pvr_selected_product", String(index));
        window.location.href = "/services#product-detail-section";
      }
      return;
    }

    setSelectedProductIndex(index);
    const el = document.getElementById("product-detail-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="section-space services-section">
      <Reveal className="container-width">
        <div className="section-header items-end">
          <div className="min-w-0">
            <div className="premium-section-badge mb-3">
              <span className="badge-glow-dot" />
              <span>Core Materials & Supply</span>
            </div>
            <h2 className="section-heading">The Essentials for Every Build.</h2>
            <p className="section-description">
              Complete range of certified building materials backed by dependable batch quality and punctual logistics.
            </p>
          </div>
          {isServicesRoute ? (
            <Link
              className="header-discuss-pill"
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>Discuss Requirements</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              className="header-discuss-pill"
              to="/services"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>View In-Detail Specs & Orders</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        <div className="service-grid">
          {materials.map((item, i) => {
            const Icon = serviceIcons[i] ?? Package;
            const isSelected = isServicesRoute && selectedProductIndex === i;

            return (
              <article
                className={`service-card group cursor-pointer transition-all ${isSelected ? "ring-2 ring-sky-500 shadow-xl border-sky-400" : ""
                  }`}
                key={item.title}
                onClick={() => handleSelectProduct(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectProduct(i);
                  }
                }}
              >
                <div className="service-photo-frame">
                  <img
                    src={item.image}
                    alt={`${item.short} ready for construction supply`}
                    loading="lazy"
                  />
                  <div className="service-photo-overlay" />
                  <span className="service-index-tag">0{i + 1}</span>
                  <div className="service-glass-icon">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="service-photo-badge">
                    <span>{item.tag}</span>
                  </div>
                </div>
                <div className="service-content">
                  <div className="service-spec-pill">
                    <span className="spec-dot" />
                    <span>{item.spec}</span>
                  </div>
                  <h3 className="service-card-title">{item.title}</h3>
                  <p className="service-card-desc">{item.description}</p>
                  <button
                    type="button"
                    className={`service-enquire-btn transition-all ${isSelected
                      ? "service-active-gradient-btn text-white shadow-md"
                      : "hover:service-active-gradient-btn"
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectProduct(i);
                    }}
                  >
                    <span>
                      {isServicesRoute
                        ? isSelected
                          ? "Active Specification 👇"
                          : "Configure & Order"
                        : "Configure & Order"}
                    </span>
                    {isServicesRoute ? (
                      <ShoppingCart
                        className={`w-3.5 h-3.5 ${isSelected
                          ? "text-white"
                          : "text-sky-600 group-hover:text-white transition-colors"
                          }`}
                      />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-sky-600 group-hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* In-Page In-Detail Product Specification & Configurator - ONLY on Services Page */}
        {isServicesRoute && (
          <div id="product-detail-section" className="scroll-mt-24">
            <ProductDetailSection
              selectedIndex={selectedProductIndex}
              onSelectProduct={setSelectedProductIndex}
            />
          </div>
        )}
      </Reveal>
    </section>
  );
}
export function Clients() {
  return (
    <section id="clients" className="section-space clients-section" aria-label="Our Clients">
      <Reveal className="container-width">
        <div className="section-header items-end">
          <div className="min-w-0">
            <div className="premium-section-badge mb-2">
              <span className="badge-glow-dot" />
              <span>Trusted Partnerships</span>
            </div>
            <h2 className="section-heading">Trusted by Leading Builders & Contractors.</h2>
            <p className="section-description">
              Dependable material supply for landmark residential, commercial, industrial, and infrastructure developments.
            </p>
          </div>
          <Link
            className="header-discuss-pill"
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>Partner With Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Client stats strip */}
        <div className="clients-stats-strip">
          {clientStats.map((st) => (
            <div className="client-stat-item" key={st.label}>
              <span className="client-stat-val">{st.value}</span>
              <span className="client-stat-lbl">{st.label}</span>
            </div>
          ))}
        </div>

        {/* Client cards grid */}
        <div className="clients-grid">
          {clientPartners.map((item) => (
            <article className="client-card group" key={item.name}>
              <div className="client-card-top">
                <div className="client-card-icon">
                  <Building2 className="w-4 h-4 text-sky-500" />
                </div>
                <span className="client-badge">{item.badge}</span>
              </div>
              <h3 className="client-name">{item.name}</h3>
              <p className="client-category">{item.category}</p>
              <div className="client-supply-pill">
                <span className="client-dot" />
                <span className="client-supply-text">{item.materialSupplied}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Client network ticker */}
        <div className="clients-ticker-wrap">
          <span className="clients-ticker-label">CLIENT NETWORK:</span>
          <div className="clients-ticker-tags">
            {clientBrands.map((b) => (
              <span className="client-ticker-pill" key={b}>
                <BadgeCheck className="w-3.5 h-3.5 text-sky-500 inline mr-1" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ProjectCategories() {
  return (
    <section id="projects" className="section-space projects-section bg-secondary" aria-label="Project Categories">
      <Reveal className="container-width">
        <div className="section-header-left text-left mb-2">
          <div className="premium-section-badge mb-1.5">
            <span className="badge-glow-dot" />
            <span>Sector Specializations</span>
          </div>
          <h2 className="section-heading">Supporting Every Kind of Ambition.</h2>
          <p className="section-description">
            Supplying dependable structural materials for residential, commercial, and large-scale infrastructure projects.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((item, index) => (
            <Link
              to="/contact"
              className="project-card group text-left"
              key={item.title}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {/* Architectural Image Wrap */}
              <div className="project-image-wrap">
                <img
                  src={item.image}
                  alt={`${item.title} project materials supply`}
                  loading="lazy"
                  className="project-card-img"
                />
                <div className="project-card-overlay" />
              </div>

              {/* Floating Top Elements */}
              <div className="project-card-top">
                <span className="project-index-badge">
                  <span className="badge-idx">0{index + 1}</span>
                  <span className="badge-dot-sep" />
                  <span className="badge-sector">{item.sector}</span>
                </span>
                <div className="project-arrow-pill">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Scrim Content - Left Aligned & Perfectly Contained */}
              <div className="project-caption text-left items-start w-full">
                <div className="project-spec-tag text-left">
                  <span className="spec-dot" />
                  <span>{item.spec}</span>
                </div>
                <h3 className="project-title text-left">{item.title}</h3>
                <div className="project-explore-row text-left">
                  <span>Explore Sector Materials</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
const reasons = [
  {
    icon: ShieldCheck,
    idx: "01",
    tag: "Certified Standards",
    title: "Quality Materials",
    description:
      "Carefully sourced materials meeting stringent structural benchmarks, durability standards, and compressive strength criteria.",
    benefit: "100% Quality Tested Batch",
  },
  {
    icon: Truck,
    idx: "02",
    tag: "Fleet & Dispatch",
    title: "Reliable Site Supply",
    description:
      "A disciplined supply chain and heavy fleet dispatch ensuring timely on-site deliveries without halting build timelines.",
    benefit: "Guaranteed On-Time Delivery",
  },
  {
    icon: BadgeDollarSign,
    idx: "03",
    tag: "Direct Valuation",
    title: "Competitive Pricing",
    description:
      "Transparent, factory-direct bulk procurement rates with zero hidden markups or intermediary costs.",
    benefit: "Direct Factory Wholesale Rates",
  },
  {
    icon: Handshake,
    idx: "04",
    tag: "Client Partnership",
    title: "Customer Satisfaction",
    description:
      "Dedicated coordination, flexible volume scheduling, and trustworthy assistance tailored to your project scope.",
    benefit: "Dedicated Project Coordinator",
  },
];
export function WhyChooseUs() {
  return (
    <section className="section-space why-section" aria-label="Why Choose PVR Traders">
      <Reveal className="container-width">
        <div className="section-header-left text-left mb-3">
          <div className="premium-section-badge mb-3">
            <span className="badge-glow-dot" />
            <span>The PVR Promise</span>
          </div>
          <h2 className="section-heading">Why Partner With PVR Traders?</h2>
          <p className="section-description">
            Tested material quality, punctual fleet dispatch, and direct factory pricing you can trust.
          </p>
        </div>
        <div className="why-grid">
          {reasons.map(({ icon: Icon, idx, tag, title, description, benefit }) => (
            <div className="why-card-premium group" key={title}>
              <div className="why-card-header">
                <div className="why-icon-box">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="why-watermark-number">{idx}</span>
              </div>

              <div className="why-card-body">
                <span className="why-tag-pill">{tag}</span>
                <h3 className="why-card-title">{title}</h3>
                <p className="why-card-desc">{description}</p>
              </div>

              <div className="why-card-footer">
                <div className="why-benefit-pill">
                  <Check className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
export function CallToAction() {
  return (
    <section className="cta-band">
      <div className="container-width cta-inner">
        <div>
          <h2>Let’s Build Something Strong Together.</h2>
          <p>Looking for reliable construction materials? Get in touch with PVR Traders today.</p>
        </div>
        <Button variant="hero" size="lg" asChild>
          <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Contact Us <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
type ContactField = "name" | "phone" | "email" | "subject" | "message";
type ContactFormData = Record<ContactField, string>;
type ContactFormErrors = Partial<Record<ContactField, string>>;
type ContactFormTouched = Partial<Record<ContactField, boolean>>;

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<ContactFormTouched>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notice, setNotice] = useState("");

  const validateField = (field: string, value: string): string => {
    const val = value.trim();
    switch (field) {
      case "name":
        if (!val) return "Your name is required";
        if (/\d/.test(value)) return "Name cannot contain numbers";
        if (!/^[a-zA-Z\s.']{3,50}$/.test(val)) return "Name must be at least 3 letters (letters only)";
        return "";
      case "phone": {
        if (!val) return "Phone number is required";
        if (/[a-zA-Z]/.test(value)) return "Phone number cannot contain letters";
        const digits = value.replace(/\D/g, "");
        if (digits.length !== 10) return "Phone number must be exactly 10 digits";
        if (!/^[6-9]/.test(digits)) return "Enter a valid 10-digit mobile number (starts with 6-9)";
        return "";
      }
      case "email":
        if (!val) return "Email address is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
          return "Please enter a valid email address (e.g. name@example.com)";
        }
        return "";
      case "subject":
        if (!val) return "Subject / Material is required";
        if (val.length < 3) return "Subject must be at least 3 characters";
        return "";
      case "message":
        if (!val) return "Message / Project details are required";
        if (val.length < 10) return "Please provide at least 10 characters of project details";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as ContactField;
    const value = e.target.value;
    let cleanValue = value;
    if (field === "phone") {
      // Strictly only digits and maximum 10 digits
      cleanValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (field === "name") {
      // Prevent typing numbers in name
      cleanValue = value.replace(/[0-9]/g, "");
    }
    setFormData((prev) => ({ ...prev, [field]: cleanValue }));
    if (touched[field]) {
      const err = validateField(field, cleanValue);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as ContactField;
    const value = e.target.value;
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: ContactFormTouched = { name: true, phone: true, email: true, subject: true, message: true };
    setTouched(allTouched);

    const newErrors: ContactFormErrors = {};
    let hasError = false;
    (["name", "phone", "email", "subject", "message"] as const).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) {
        newErrors[field] = err;
        hasError = true;
      }
    });
    setErrors(newErrors);

    if (hasError) {
      const firstInvalid = (["name", "phone", "email", "subject", "message"] as const).find((f) => newErrors[f]);
      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus();
      }
      return;
    }

    setIsSubmitted(true);
    setNotice(getContactSubmissionResult().message);
  };
  return (
    <section id="contact" className="section-space contact-section" aria-label="Contact and Location">
      <Reveal className="container-width">
        {/* Section Header */}
        <div className="section-header-left text-left mb-3">
          <div className="premium-section-badge mb-3">
            <span className="badge-glow-dot" />
            <span>Connect & Supply Logistics</span>
          </div>
          <h2 className="section-heading">Let’s Talk About Your Next Project.</h2>
          <p className="section-description">
            Have a material requirement or bulk order inquiry? Reach our dispatch team directly for instant procurement support.
          </p>
        </div>

        {/* Two Balanced Premium Cards */}
        <div className="contact-cards-grid">
          {/* Card 1: Direct Inquiries & Location Depot */}
          <div className="contact-card-premium contact-info-card">
            <div className="card-top-header">
              <span className="card-kicker">Headquarters & Supply Yard</span>
              <h3 className="card-title">Direct Inquiries</h3>
              <p className="card-subtitle">
                Reach out to our logistics desk or navigate directly to our materials yard.
              </p>
            </div>

            {/* 2x2 Details Grid */}
            <div className="contact-details-grid">
              <div className="contact-info-item">
                <div className="info-icon-box">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="info-text">
                  <span className="info-label">Phone Support</span>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <a
                      href="tel:+918121277575"
                      className="info-value hover:text-sky-600 transition-colors font-medium"
                      title="Call +91 81212 77575"
                    >
                      +91 81212 77575
                    </a>
                    <a
                      href="tel:+919866723820"
                      className="info-value hover:text-sky-600 transition-colors font-medium"
                      title="Call +91 98667 23820"
                    >
                      +91 98667 23820
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-box">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="info-text">
                  <span className="info-label">Email Desk</span>
                  <span className="info-value">{contact.email}</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-box">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="info-text">
                  <span className="info-label">Working Hours</span>
                  <span className="info-value">{contact.hours}</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-box">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="info-text">
                  <span className="info-label">Depot Coordinates</span>
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-value-link"
                    title="View on Google Maps"
                  >
                    <span>{contact.address}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 inline text-sky-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Seamless Embedded Map Box */}
            <div className="card-map-embed">
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PVR Traders Yard Location"
              />
              <div className="card-map-overlay">
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-map-btn"
                >
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Send an Enquiry */}
          <div className="contact-card-premium contact-form-card">
            <div className="card-top-header">
              <span className="card-kicker">Material Procurement</span>
              <h3 className="card-title">Send a Message</h3>
              <p className="card-subtitle">
                Tell us about your project requirements and receive a prompt quote.
              </p>
            </div>

            {isSubmitted ? (
              <div className="form-success-card">
                <div className="form-success-icon">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="form-success-title">Message Sent Successfully!</h4>
                <p className="form-success-desc">
                  Thank you, <strong>{formData.name}</strong>. We received your requirement for{" "}
                  <strong>{formData.subject}</strong>. Our logistics desk will contact you at{" "}
                  <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  className="premium-submit-btn mt-2"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
                    setErrors({});
                    setTouched({});
                    setNotice("");
                  }}
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form className="premium-contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-fields-grid">
                  <div className="field">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={50}
                      placeholder="Full name (letters only)"
                      autoComplete="name"
                      className={touched.name && errors.name ? "input-error" : ""}
                    />
                    {touched.name && errors.name && (
                      <span className="form-error-msg">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      placeholder="10-digit mobile number"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.phone ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="tel"
                      className={touched.phone && errors.phone ? "input-error" : ""}
                    />
                    {touched.phone && errors.phone && (
                      <span className="form-error-msg">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      placeholder="e.g. name@example.com"
                      type="email"
                      value={formData.email ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      className={touched.email && errors.email ? "input-error" : ""}
                    />
                    {touched.email && errors.email && (
                      <span className="form-error-msg">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="subject">Subject / Material Needed</label>
                    <input
                      id="subject"
                      name="subject"
                      value={formData.subject ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Cement, TMT Steel, Sand"
                      className={touched.subject && errors.subject ? "input-error" : ""}
                    />
                    {touched.subject && errors.subject && (
                      <span className="form-error-msg">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.subject}
                      </span>
                    )}
                  </div>
                  <div className="field full-field">
                    <label htmlFor="message">Your Message / Project Details</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Provide details about quantity, delivery location, or timeline…"
                      rows={4}
                      className={touched.message && errors.message ? "input-error" : ""}
                    />
                    {touched.message && errors.message && (
                      <span className="form-error-msg">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-footer-action">
                  <p className="form-note">
                    Official dispatch desk. Your contact information is kept strictly confidential.
                  </p>
                  <button type="submit" className="premium-submit-btn">
                    <span>Send Message</span>
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </div>

                {notice && (
                  <p role="status" className="form-status full-field mt-3">
                    {notice}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
