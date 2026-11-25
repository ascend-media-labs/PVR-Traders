import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductDetailSection } from "@/components/pvr/product-detail-section";
import { ArrowLeft } from "lucide-react";
import { materials } from "@/lib/pvr-content";
import { Navbar, Footer, FloatingContactActions } from "@/components/pvr/navigation";

export const Route = createFileRoute("/product-detail")({
  head: () => ({
    meta: [
      { title: "Product Specifications & Direct Procurement | PVR Traders" },
      {
        name: "description",
        content:
          "Configure building material specifications, select delivery modes, and order bulk construction supplies directly from PVR Traders.",
      },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    // Read from search query (?product=X) or sessionStorage
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get("product");
    if (productParam !== null && !isNaN(Number(productParam))) {
      const idx = Math.max(0, Math.min(materials.length - 1, parseInt(productParam, 10)));
      setSelectedIndex(idx);
    } else {
      const stored = sessionStorage.getItem("pvr_selected_product");
      if (stored !== null && !isNaN(Number(stored))) {
        const idx = Math.max(0, Math.min(materials.length - 1, parseInt(stored, 10)));
        setSelectedIndex(idx);
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleSelectProduct = (index: number) => {
    setSelectedIndex(index);
    sessionStorage.setItem("pvr_selected_product", String(index));
    window.history.replaceState({}, "", `/product-detail?product=${index}`);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4"
      >
        Skip to content
      </a>
      <Navbar />

      <main id="main-content" className="product-detail-page-main">
        {/* Sleek Sub Navigation / Back Link */}
        <div className="product-detail-subnav">
          <div className="container-width product-detail-subnav-inner">
            <Link
              to="/services"
              className="product-detail-back-pill"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Products</span>
            </Link>
          </div>
        </div>

        {/* Main Configurator Workspace */}
        <div className="container-width product-detail-workspace-inner">
          <ProductDetailSection
            selectedIndex={selectedIndex}
            onSelectProduct={handleSelectProduct}
          />
        </div>
      </main>

      <Footer />
      <FloatingContactActions />
    </>
  );
}
