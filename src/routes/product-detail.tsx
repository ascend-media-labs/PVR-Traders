import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductDetailSection } from "@/components/pvr/product-detail-section";
import { ArrowLeft, ArrowUpRight, ShoppingCart } from "lucide-react";
import { materials } from "@/lib/pvr-content";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "@/components/pvr/cart-drawer";
import { FloatingContactActions } from "@/components/pvr/navigation";

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
  const { totalItems, setIsCartOpen } = useCart();

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
    <div className="product-detail-fullscreen-shell">
      {/* Sleek Top Navigation Bar */}
      <header className="product-detail-top-bar">
        <div className="container-width product-detail-top-inner">
          <Link
            to="/services"
            className="product-detail-back-pill"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Products</span>
          </Link>
          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              type="button"
              className="product-detail-cart-pill"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Material Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Material Cart</span>
              {totalItems > 0 && <span className="cart-pill-count">{totalItems}</span>}
            </button>
            <Link
              to="/contact"
              className="product-detail-support-link"
            >
              <span>Need Custom Supply Support?</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Full-Viewport Configurator Workspace */}
      <main id="main-content" className="product-detail-workspace">
        <div className="container-width product-detail-workspace-inner">
          <ProductDetailSection
            selectedIndex={selectedIndex}
            onSelectProduct={handleSelectProduct}
          />
        </div>
      </main>

      <CartDrawer />
      <FloatingContactActions />
    </div>
  );
}
