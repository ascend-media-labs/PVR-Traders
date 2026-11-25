import { useState } from "react";
import { X, Check, ShoppingCart, Plus, Minus, ShieldCheck, Package, Truck, Award } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

interface StoneProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  stoneImage?: string;
}

const VEHICLE_OPTIONS = [
  {
    id: "Lorry",
    name: "Lorry (Tipper)",
    tag: "Heavy Bulk",
    description: "Large capacity heavy dumpers suitable for commercial projects & multi-storey structures.",
  },
  {
    id: "Tractor",
    name: "Tractor (Trailer)",
    tag: "Residential & Site",
    description: "Agile delivery trailers perfect for individual homes, tight colony lanes, and medium sites.",
  },
];

const LORRY_CAPACITIES = [
  {
    id: "10 Tyres",
    name: "10 Tyres Lorry",
    tag: "650 - 700 cft",
    description: "Standard heavy tipper carrying approx. 18 to 20 metric tonnes of stone aggregates.",
  },
  {
    id: "12 Tyres",
    name: "12 Tyres Lorry",
    tag: "850 - 900 cft",
    description: "High-capacity mega tipper carrying approx. 24 to 26 metric tonnes of stone aggregates.",
  },
];

const TRACTOR_CAPACITIES = [
  {
    id: "Full Body",
    name: "Full Body Tractor",
    tag: "100 - 120 cft",
    description: "Standard full trailer load suitable for slab casting, beams, and foundation concrete.",
  },
  {
    id: "Half Body",
    name: "Half Body Tractor",
    tag: "50 - 60 cft",
    description: "Compact half trailer load for small repairs, flooring base, and boundary walls.",
  },
];

const PRESET_LOADS = [1, 2, 3, 5, 10];

export function StoneProductModal({ isOpen, onClose, stoneImage = "/images/stone-chips-supply.jpg" }: StoneProductModalProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [customInputValue, setCustomInputValue] = useState<string>("1");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setSelectedCapacity(null);
    setIsSuccess(false);
  };

  const handleCapacitySelect = (capId: string) => {
    setSelectedCapacity(capId);
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
    const next = quantity + 1;
    setQuantity(next);
    setCustomInputValue(String(next));
  };

  const handleDecrement = () => {
    const next = Math.max(1, quantity - 1);
    setQuantity(next);
    setCustomInputValue(String(next));
  };

  const handleAddToCart = () => {
    if (!selectedVehicle || !selectedCapacity) return;
    const finalQty = Math.max(1, quantity || 1);
    const unitLabel = finalQty === 1 ? "Load" : "Loads";

    addToCart({
      productName: "Crusher Chips Supply",
      type: `${selectedVehicle} (${selectedCapacity})`,
      quantity: finalQty,
      unit: unitLabel,
      image: stoneImage,
    });
    setIsSuccess(true);
  };

  const handleOpenCart = () => {
    onClose();
    setIsCartOpen(true);
  };

  const capacityOptions = selectedVehicle === "Lorry" ? LORRY_CAPACITIES : selectedVehicle === "Tractor" ? TRACTOR_CAPACITIES : [];

  return (
    <div className="cement-modal-backdrop" onClick={onClose}>
      <div
        className="cement-modal-dialog cement-modal-wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stone-modal-title"
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
          <h2 id="stone-modal-title" className="cement-modal-heading">
            Crusher Chips Supply
          </h2>
          <p className="cement-modal-desc">
            Choose delivery vehicle (Lorry / Tractor), select capacity option, and specify number of loads directly for your site.
          </p>
        </div>

        {/* 2-Column Body: Left = Product Info, Right = Options */}
        <div className="cement-modal-columns">
          {/* Left Column: Product Showcase */}
          <div className="cement-modal-product-col">
            <div className="cement-modal-photo-wrap">
              <img
                src={stoneImage}
                alt="Crusher Chips Blue Granite Aggregates"
                className="cement-modal-photo"
              />
              <span className="cement-modal-idx-tag">04 | CRUSHER CHIPS</span>
              <div className="cement-modal-photo-tag">10MM / 20MM / 40MM</div>
            </div>

            <div className="cement-modal-product-details">
              <div className="cement-modal-spec-pill">
                <span className="spec-dot" />
                <span>HIGH COMPRESSIVE AGGREGATE</span>
              </div>
              <h3 className="cement-modal-product-name">Crusher Chips Supply</h3>
              <p className="cement-modal-product-desc">
                High-grade blue granite crushed aggregates offering superior compressive strength and angularity for heavy structural concrete and foundations.
              </p>

              <div className="cement-modal-highlights">
                <div className="cement-highlight-item">
                  <Award className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Crushed blue granite with high impact value</span>
                </div>
                <div className="cement-highlight-item">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Clean, machine-screened for optimal bonding</span>
                </div>
                <div className="cement-highlight-item">
                  <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Lorry (10/12 Tyres) & Tractor (Full/Half) dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Options */}
          <div className="cement-modal-options-col">
            {/* Step 1: Vehicle Selection (Lorry / Tractor) */}
            <div className="cement-step-block">
              <div className="cement-step-label-row">
                <span className="cement-step-num">1</span>
                <h3 className="cement-step-title">Select Delivery Vehicle</h3>
                {selectedVehicle && (
                  <span className="cement-selected-badge">
                    Vehicle: <strong>{selectedVehicle}</strong>
                  </span>
                )}
              </div>

              <div className="cement-type-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                {VEHICLE_OPTIONS.map((v) => {
                  const isSelected = selectedVehicle === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`cement-type-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleVehicleSelect(v.id)}
                    >
                      <div className="cement-type-top">
                        <span className="cement-type-name">{v.name}</span>
                      </div>
                      <p className="cement-type-desc">{v.description}</p>
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

            {/* Step 2: Capacity Selection */}
            {selectedVehicle && (
              <div className="cement-step-block animate-fade-in">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">2</span>
                  <h3 className="cement-step-title">
                    {selectedVehicle === "Lorry" ? "Select Lorry Tyres / Capacity" : "Select Tractor Body Type"}
                  </h3>
                  {selectedCapacity && (
                    <span className="cement-selected-badge">
                      Capacity: <strong>{selectedCapacity}</strong>
                    </span>
                  )}
                </div>

                <div className="cement-type-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                  {capacityOptions.map((c) => {
                    const isSelected = selectedCapacity === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        className={`cement-type-card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleCapacitySelect(c.id)}
                      >
                        <div className="cement-type-top">
                          <span className="cement-type-name">{c.name}</span>
                        </div>
                        <p className="cement-type-desc">{c.description}</p>
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
            )}

            {/* Step 3: Number of Loads Quantity */}
            {selectedCapacity && (
              <div className="cement-step-block animate-fade-in">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">3</span>
                  <h3 className="cement-step-title">Number of Loads</h3>
                </div>

                {/* Quick Presets: 1, 2, 3, 5, 10 Loads */}
                <div className="cement-preset-row">
                  <span className="cement-preset-label">Quick Select Loads:</span>
                  <div className="cement-preset-pills">
                    {PRESET_LOADS.map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        className={`cement-preset-btn ${quantity === qty ? "active" : ""}`}
                        onClick={() => handlePresetQuantity(qty)}
                      >
                        {qty} {qty === 1 ? "Load" : "Loads"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Quantity Input with +/- */}
                <div className="cement-quantity-input-box">
                  <span className="cement-qty-field-label">Custom Loads (Type or search any number):</span>
                  <div className="cement-stepper-wrap">
                    <button
                      type="button"
                      className="cement-stepper-btn"
                      aria-label="Decrease loads"
                      onClick={handleDecrement}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      step="1"
                      value={customInputValue}
                      onChange={handleInputChange}
                      className="cement-qty-input"
                      placeholder="1, 2, 5, 10..."
                    />
                    <button
                      type="button"
                      className="cement-stepper-btn"
                      aria-label="Increase loads"
                      onClick={handleIncrement}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="cement-qty-unit-label">
                      {selectedVehicle} {quantity === 1 ? "Load" : "Loads"}
                    </span>
                  </div>
                </div>

                {/* Selection Summary */}
                <div className="cement-order-summary-box">
                  <div className="cement-summary-icon">
                    <Package className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="cement-summary-details">
                    <span className="cement-summary-title">
                      Crusher Chips Supply
                    </span>
                    <span className="cement-summary-qty">
                      Vehicle: <strong>{selectedVehicle} ({selectedCapacity})</strong> • Total: <strong>{quantity} {quantity === 1 ? "Load" : "Loads"}</strong>
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
                  Added <strong>{quantity} {quantity === 1 ? "Load" : "Loads"} of Crusher Chips ({selectedVehicle} {selectedCapacity})</strong> to Cart!
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
                disabled={!selectedVehicle || !selectedCapacity || quantity < 1}
                className="cement-add-btn"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                <span>
                  {selectedVehicle && selectedCapacity
                    ? `Add ${quantity} ${quantity === 1 ? "Load" : "Loads"} (${selectedVehicle} ${selectedCapacity}) to Cart`
                    : "Select Vehicle & Capacity to Continue"}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
