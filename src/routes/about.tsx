import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, FloatingContactActions } from "@/components/pvr/navigation";
import { About, WhyChooseUs } from "@/components/pvr/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | PVR Traders - Construction Materials" },
      {
        name: "description",
        content:
          "Discover PVR Traders' dedication to quality building materials, proven batch testing, and dependable logistics.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" style={{ minHeight: "70vh", paddingBottom: "30px" }}>
        <About />
        <WhyChooseUs />
      </main>
      <Footer />
      <FloatingContactActions />
    </>
  );
}
