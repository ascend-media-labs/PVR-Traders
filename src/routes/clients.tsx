import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, FloatingContactActions } from "@/components/pvr/navigation";
import { Clients } from "@/components/pvr/sections";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Our Clients & Partners | PVR Traders" },
      {
        name: "description",
        content:
          "Trusted by leading builders, civil contractors, and infrastructure developers across the region.",
      },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
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
        <Clients />
      </main>
      <Footer />
      <FloatingContactActions />
    </>
  );
}
