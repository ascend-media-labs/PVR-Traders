import { X, Trash2, Plus, Minus, ShoppingCart, Send, ArrowRight, Package } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, totalPackets } = useCart();

  if (!isCartOpen) return null;

  // Format WhatsApp message
  const whatsappNumber = "919502362950"; // PVR Traders WhatsApp order inquiries: +91 95023 62950
  const orderSummaryText = items
    .map((it) => `• ${it.productName} (Type: ${it.type}) - ${it.quantity} ${it.unit}`)
    .join("\n");
  const whatsappMessage = encodeURIComponent(
    `Hello PVR Traders,\n\nI would like to inquire about ordering the following construction materials:\n\n${orderSummaryText}\n\nTotal Packets: ${totalPackets}\n\nPlease share the best price quote, availability, and delivery schedule. Thank you!\n\n(Helpline: +91 81212 77575 / +91 98667 23820)`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <aside
        className="cart-drawer-panel"
        role="dialog"
        aria-label="Material Cart"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-wrap">
            <div className="cart-header-icon-box">
              <ShoppingCart className="w-4 h-4 text-sky-500" />
            </div>
            <div>
              <h2 className="cart-drawer-title">Material Cart</h2>
              <span className="cart-drawer-subtitle">
                {items.length === 0 ? "No items selected" : `${items.length} item(s) • ${totalPackets} total quantity`}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            aria-label="Close Cart"
            onClick={() => setIsCartOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Items */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <Package className="w-10 h-10 text-slate-400 stroke-1" />
              </div>
              <h3 className="cart-empty-heading">Your cart is empty</h3>
              <p className="cart-empty-desc">
                Click on any construction material card to configure specifications and add directly to your cart.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Browse Materials
              </Button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <div className="cart-item-card" key={item.id}>
                  {item.image && (
                    <div className="cart-item-thumb">
                      <img src={item.image} alt={item.productName} />
                    </div>
                  )}
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <h4 className="cart-item-name">{item.productName}</h4>
                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        title="Remove item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.type.includes(" • ") ? (
                      <div className="cart-item-type-badge multi-line">
                        <div className="cart-badge-row">
                          <span className="cart-badge-lbl">TYPE:</span>
                          <strong>{item.type.split(" • ")[0]}</strong>
                        </div>
                        <div className="cart-badge-row">
                          <span className="cart-badge-lbl">VEHICLE:</span>
                          <strong>{item.type.split(" • ")[1]}</strong>
                        </div>
                      </div>
                    ) : (
                      <div className="cart-item-type-badge">
                        <span>
                          {item.unit === "Bars"
                            ? "SIZE:"
                            : item.unit === "Loads" || item.unit === "Load"
                              ? "VEHICLE:"
                              : "TYPE:"}
                        </span>
                        <strong>{item.type}</strong>
                      </div>
                    )}

                    <div className="cart-item-qty-row">
                      <span className="cart-qty-label">Quantity:</span>
                      <div className="cart-qty-controls">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          disabled={item.quantity <= 1}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="cart-qty-display">
                          {item.quantity} {item.unit}
                        </span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Action */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-box">
              <div className="cart-summary-row">
                <span>Selected Types:</span>
                <span className="font-semibold text-slate-800">
                  {items.map((i) => i.type).join(", ")}
                </span>
              </div>
              <div className="cart-summary-row total">
                <span>Total Quantity:</span>
                <span className="cart-total-highlight">{totalPackets} Units</span>
              </div>
            </div>

            <div className="cart-actions-column">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cart-whatsapp-btn"
                onClick={() => setIsCartOpen(false)}
              >
                <Send className="w-4 h-4" />
                <span>Inquire & Order via WhatsApp</span>
              </a>

              <Button asChild variant="outline" className="cart-quote-link" onClick={() => setIsCartOpen(false)}>
                <Link to="/contact">
                  <span>Send Direct Quote Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>

              <button type="button" className="cart-clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
