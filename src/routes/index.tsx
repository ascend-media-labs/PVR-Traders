import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, FloatingContactActions } from "@/components/pvr/navigation";
import {
  Hero,
  MaterialsCarousel,
  About,
  Services,
  Clients,
  ProjectCategories,
  WhyChooseUs,
  Contact,
} from "@/components/pvr/sections";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PVR Traders | Premium Construction Materials" },
      {
        name: "description",
        content:
          "Build with confidence. PVR Traders supplies quality cement, iron and steel, sand, crusher chips, and cement bricks for residential, commercial and infrastructure projects.",
      },
      { property: "og:title", content: "PVR Traders | Premium Construction Materials" },
      {
        property: "og:description",
        content:
          "Building strong foundations for a better tomorrow. Discover quality materials and dependable construction supply from PVR Traders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
function Index() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MaterialsCarousel />
        <About />
        <Services isStandalonePage={false} />
        <Clients />
        <ProjectCategories />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
      <FloatingContactActions />
    </>
  );
}
