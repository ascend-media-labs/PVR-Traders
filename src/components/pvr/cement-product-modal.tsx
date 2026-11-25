import { useState } from "react";
import { X, Check, ShoppingCart, Plus, Minus, ShieldCheck, Sparkles, Package, Truck, Award } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

interface CementProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  cementImage?: string;
}

const CEMENT_TYPES = [
  {
    id: "OPC",
    name: "OPC (Ordinary Portland)",
    tag: "Grade 53 / 43",
    description: "High-load structural concrete, foundations, columns & slabs.",
    color: "#0284c7",
  },
  {
    id: "PPC",
    name: "PPC (Pozzolana Cement)",
    tag: "Crack-Resistant",
    description: "Superior durability, plastering, masonry & coastal builds.",
    color: "#0ea5e9",
  },
  {
    id: "HD",
    name: "HD (Heavy Duty)",
    tag: "Industrial Strength",
    description: "Engineered for heavy industrial yards, pavements & bridges.",
    color: "#0369a1",
  },
  {
    id: "SUPER",
    name: "SUPER (Super Grade)",
    tag: "Fast Setting",
    description: "Ultra-fast setting strength for rapid construction turnaround.",
    color: "#0284c7",
  },
];

const PRESET_QUANTITIES = [10, 25, 50, 100, 250];

export function CementProductModal({ isOpen, onClose, cementImage = "/images/cement-supply.jpg" }: CementProductModalProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(25);
  const [customInputValue, setCustomInputValue] = useState<string>("25");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setIsSuccess(false);
  };

  const handlePresetQuantity = (qty: number) => {
    setQuantity(qty);
    setCustomInputValue(String(qty));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomInputValue(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setQuantity(parsed);
    }
  };

  const handleIncrement = () => {
    const next = quantity + 5;
    setQuantity(next);
    setCustomInputValue(String(next));
  };

  const handleDecrement = () => {
    const next = Math.max(1, quantity - 5);
    setQuantity(next);
    setCustomInputValue(String(next));
  };

  const handleAddToCart = () => {
    if (!selectedType) return;
    const finalQty = Math.max(1, quantity || 1);
    addToCart({
      productName: "Cement Supply",
      type: selectedType,
      quantity: finalQty,
      unit: "Packets",
      image: cementImage,
    });
    setIsSuccess(true);
  };

  const handleOpenCart = () => {
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="cement-modal-backdrop" onClick={onClose}>
      <div
        className="cement-modal-dialog cement-modal-wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cement-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="cement-modal-header">
          <div className="cement-modal-title-row">
            <div className="cement-modal-badge">
              <span className="badge-glow-dot" />
              <span>Product Specifications & Order</span>
            </div>
            <button
              type="button"
              className="cement-modal-close"
              aria-label="Close dialog"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 id="cement-modal-title" className="cement-modal-heading">
            Cement Supply
          </h2>
          <p className="cement-modal-desc">
            Select your cement type, specify packet quantities, and add directly to your cart.
          </p>
        </div>

        {/* 2-Column Body: Left = Product Info, Right = Types & Quantities */}
        <div className="cement-modal-columns">
          {/* Left Column: Product Showcase */}
          <div className="cement-modal-product-col">
            <div className="cement-modal-photo-wrap">
              <img
                src={cementImage}
                alt="Cement Supply Construction Materials"
                className="cement-modal-photo"
              />
              <span className="cement-modal-idx-tag">01 | CEMENT</span>
              <div className="cement-modal-photo-tag">GRADE 53 / 43 OPC & PPC</div>
            </div>

            <div className="cement-modal-product-details">
              <div className="cement-modal-spec-pill">
                <span className="spec-dot" />
                <span>CERTIFIED HIGH-STRENGTH BINDER</span>
              </div>
              <h3 className="cement-modal-product-name">Cement Supply</h3>
              <p className="cement-modal-product-desc">
                High-strength certified Portland & Pozzolana cement engineered for residential, commercial, and industrial foundation builds.
              </p>

              <div className="cement-modal-highlights">
                <div className="cement-highlight-item">
                  <Award className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Standard 50kg moisture-resistant bags</span>
                </div>
                <div className="cement-highlight-item">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>IS 12269 & IS 1489 batch certified</span>
                </div>
                <div className="cement-highlight-item">
                  <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Punctual on-site delivery available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Types & Quantities Selector */}
          <div className="cement-modal-options-col">
            {/* Step 1: Cement Type Selection */}
            <div className="cement-step-block">
              <div className="cement-step-label-row">
                <span className="cement-step-num">1</span>
                <h3 className="cement-step-title">Select Cement Type</h3>
                {selectedType && (
                  <span className="cement-selected-badge">
                    Selected: <strong>{selectedType}</strong>
                  </span>
                )}
              </div>

              <div className="cement-type-grid">
                {CEMENT_TYPES.map((t) => {
                  const isSelected = selectedType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`cement-type-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleTypeSelect(t.id)}
                    >
                      <div className="cement-type-top">
                        <span className="cement-type-name">{t.id}</span>
                      </div>
                      <span className="cement-type-fullname">{t.name}</span>
                      <p className="cement-type-desc">{t.description}</p>
                      {isSelected && (
                        <div className="cement-type-check">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Packet Quantity (shown once type is chosen) */}
            {selectedType && (
              <div className="cement-step-block animate-fade-in">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">2</span>
                  <h3 className="cement-step-title">Enter Packets / Bags Quantity</h3>
                </div>

                {/* Quick Preset Buttons: 10, 25, 100 */}
                <div className="cement-preset-row">
                  <span className="cement-preset-label">Quick Select:</span>
                  <div className="cement-preset-pills">
                    {PRESET_QUANTITIES.map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        className={`cement-preset-btn ${quantity === qty ? "active" : ""}`}
                        onClick={() => handlePresetQuantity(qty)}
                      >
                        {qty} Packets
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Quantity Input with +/- */}
                <div className="cement-quantity-input-box">
                  <span className="cement-qty-field-label">Custom Quantity (Type or search any number):</span>
                  <div className="cement-stepper-wrap">
                    <button
                      type="button"
                      className="cement-stepper-btn"
                      aria-label="Decrease quantity"
                      onClick={handleDecrement}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      step="1"
                      value={customInputValue}
                      onChange={handleInputChange}
                      className="cement-qty-input"
                      placeholder="10, 25, 100..."
                    />
                    <button
                      type="button"
                      className="cement-stepper-btn"
                      aria-label="Increase quantity"
                      onClick={handleIncrement}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="cement-qty-unit-label">Packets (50kg bags)</span>
                  </div>
                </div>

                {/* Selection Summary */}
                <div className="cement-order-summary-box">
                  <div className="cement-summary-icon">
                    <Package className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="cement-summary-details">
                    <span className="cement-summary-title">
                      Cement Supply — <strong>{selectedType}</strong>
                    </span>
                    <span className="cement-summary-qty">
                      Total: <strong>{quantity} Packets (Bags)</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="cement-modal-footer">
          {isSuccess ? (
            <div className="cement-success-bar">
              <div className="cement-success-message">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>
                  Added <strong>{quantity} Packets of {selectedType}</strong> to Cart!
                </span>
              </div>
              <div className="cement-success-actions">
                <Button size="sm" variant="outline" onClick={onClose}>
                  Continue Browsing
                </Button>
                <Button size="sm" className="bg-sky-600 hover:bg-sky-500 text-white" onClick={handleOpenCart}>
                  <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                  View Cart
                </Button>
              </div>
            </div>
          ) : (
            <div className="cement-modal-action-row">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={!selectedType || quantity < 1}
                className="cement-add-btn"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                <span>
                  {selectedType
                    ? `Add ${quantity} Packets of ${selectedType} to Cart`
                    : "Select a Cement Type to Continue"}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
