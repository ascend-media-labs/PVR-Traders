import { useState } from "react";
import { X, Check, ShoppingCart, Plus, Minus, ShieldCheck, Package, Truck, Award } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

interface SteelProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  steelImage?: string;
}

const STEEL_SIZES = [
  {
    id: "6",
    size: "6mm",
    tag: "Stirrups & Rings",
    description: "Column ties, beam stirrups, and seismic binding rings.",
  },
  {
    id: "8",
    size: "8mm",
    tag: "Slabs & Beams",
    description: "Standard reinforcement for slabs, decks, lintels, and chajjas.",
  },
  {
    id: "10",
    size: "10mm",
    tag: "Columns & Walls",
    description: "Load-bearing columns, shear walls, and cantilever beams.",
  },
  {
    id: "12",
    size: "12mm",
    tag: "Pillars & Footings",
    description: "Heavy structural footings, raft foundations, and primary pillars.",
  },
];

const PRESET_QUANTITIES = [10, 25, 50, 100, 250];

export function SteelProductModal({ isOpen, onClose, steelImage = "/images/iron-steel-supply.jpg" }: SteelProductModalProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(25);
  const [customInputValue, setCustomInputValue] = useState<string>("25");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
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
    if (!selectedSize) return;
    const finalQty = Math.max(1, quantity || 1);
    const sizeObj = STEEL_SIZES.find((s) => s.id === selectedSize);
    const sizeLabel = sizeObj ? sizeObj.size : `${selectedSize}mm`;

    addToCart({
      productName: "Iron & Steel Supply",
      type: `${sizeLabel} Size`,
      quantity: finalQty,
      unit: "Bars",
      image: steelImage,
    });
    setIsSuccess(true);
  };

  const handleOpenCart = () => {
    onClose();
    setIsCartOpen(true);
  };

  const selectedSizeObj = STEEL_SIZES.find((s) => s.id === selectedSize);

  return (
    <div className="cement-modal-backdrop" onClick={onClose}>
      <div
        className="cement-modal-dialog cement-modal-wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="steel-modal-title"
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
          <h2 id="steel-modal-title" className="cement-modal-heading">
            Iron & Steel Supply
          </h2>
          <p className="cement-modal-desc">
            Select your TMT rebar size (6mm, 8mm, 10mm, 12mm), specify bar quantities, and add directly to your cart.
          </p>
        </div>

        {/* 2-Column Body: Left = Product Info, Right = Sizes & Quantities */}
        <div className="cement-modal-columns">
          {/* Left Column: Product Showcase */}
          <div className="cement-modal-product-col">
            <div className="cement-modal-photo-wrap">
              <img
                src={steelImage}
                alt="Iron & Steel Supply TMT Rebars"
                className="cement-modal-photo"
              />
              <span className="cement-modal-idx-tag">02 | STEEL</span>
              <div className="cement-modal-photo-tag">FE-550D TMT & STRUCTURALS</div>
            </div>

            <div className="cement-modal-product-details">
              <div className="cement-modal-spec-pill">
                <span className="spec-dot" />
                <span>CORROSION-RESISTANT REINFORCEMENT</span>
              </div>
              <h3 className="cement-modal-product-name">Iron & Steel Supply</h3>
              <p className="cement-modal-product-desc">
                High-yield Fe-550D grade reinforcement steel engineered for maximum tensile strength, extreme bendability, and seismic protection.
              </p>

              <div className="cement-modal-highlights">
                <div className="cement-highlight-item">
                  <Award className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Fe-550D certified ductility & ribbed grip</span>
                </div>
                <div className="cement-highlight-item">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Anti-corrosive & earthquake resistant</span>
                </div>
                <div className="cement-highlight-item">
                  <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Standard 12m length with bundled logistics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sizes & Quantities Selector */}
          <div className="cement-modal-options-col">
            {/* Step 1: Size Selection */}
            <div className="cement-step-block">
              <div className="cement-step-label-row">
                <span className="cement-step-num">1</span>
                <h3 className="cement-step-title">Select TMT Bar Size</h3>
                {selectedSize && (
                  <span className="cement-selected-badge">
                    Selected: <strong>{selectedSizeObj?.size} ({selectedSize})</strong>
                  </span>
                )}
              </div>

              <div className="cement-type-grid">
                {STEEL_SIZES.map((s) => {
                  const isSelected = selectedSize === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={`cement-type-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSizeSelect(s.id)}
                    >
                      <div className="cement-type-top">
                        <span className="cement-type-name">{s.size}</span>
                        <span className="cement-type-tag">Size {s.id}</span>
                      </div>
                      <span className="cement-type-fullname">{s.tag}</span>
                      <p className="cement-type-desc">{s.description}</p>
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

            {/* Step 2: Rods / Bars Quantity (shown once size is chosen) */}
            {selectedSize && (
              <div className="cement-step-block animate-fade-in">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">2</span>
                  <h3 className="cement-step-title">Enter Rods / Bars Quantity ({selectedSizeObj?.size})</h3>
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
                        {qty} Bars
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
                    <span className="cement-qty-unit-label">Bars (Standard 12m Rebars)</span>
                  </div>
                </div>

                {/* Selection Summary */}
                <div className="cement-order-summary-box">
                  <div className="cement-summary-icon">
                    <Package className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="cement-summary-details">
                    <span className="cement-summary-title">
                      Iron & Steel Supply — <strong>{selectedSizeObj?.size} (Size {selectedSize})</strong>
                    </span>
                    <span className="cement-summary-qty">
                      Total: <strong>{quantity} Bars ({selectedSizeObj?.tag})</strong>
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
                  Added <strong>{quantity} Bars of {selectedSizeObj?.size} Steel</strong> to Cart!
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
                disabled={!selectedSize || quantity < 1}
                className="cement-add-btn"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                <span>
                  {selectedSize
                    ? `Add ${quantity} Bars of ${selectedSizeObj?.size} to Cart`
                    : "Select a Steel Size to Continue"}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
