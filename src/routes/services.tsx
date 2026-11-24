import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, FloatingContactActions } from "@/components/pvr/navigation";
import { Services } from "@/components/pvr/sections";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Products & Materials | PVR Traders" },
      {
        name: "description",
        content:
          "Complete range of certified building materials backed by dependable batch quality and punctual logistics.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="services-page-main">
        <Services isStandalonePage={true} />
      </main>
      <Footer />
      <FloatingContactActions />
    </>
  );
}
