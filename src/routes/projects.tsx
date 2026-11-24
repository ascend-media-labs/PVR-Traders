import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, FloatingContactActions } from "@/components/pvr/navigation";
import { ProjectCategories } from "@/components/pvr/sections";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Project Categories | PVR Traders" },
      {
        name: "description",
        content:
          "Supplying dependable structural materials for residential, commercial, and large-scale infrastructure projects.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
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
        <ProjectCategories />
      </main>
      <Footer />
      <FloatingContactActions />
    </>
  );
}
