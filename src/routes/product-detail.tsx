import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar, Footer, FloatingContactActions } from "@/components/pvr/navigation";
import { ProductDetailSection } from "@/components/pvr/product-detail-section";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { materials } from "@/lib/pvr-content";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <div className="container-width" style={{ paddingTop: "20px", paddingBottom: "24px" }}>
          <div className="flex items-center justify-between mb-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-900 transition-colors py-1.5 px-3.5 rounded-full bg-sky-50 border border-sky-200 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Products</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-700 transition-colors"
            >
              <span>Need Custom Supply Support?</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
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
