import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, FloatingContactActions } from "@/components/pvr/navigation";
import { Contact } from "@/components/pvr/sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | PVR Traders" },
      {
        name: "description",
        content:
          "Reach out to our logistics desk or dispatch team directly for instant procurement support and quotes.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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
        <Contact />
      </main>
      <Footer />
      <FloatingContactActions />
    </>
  );
}
