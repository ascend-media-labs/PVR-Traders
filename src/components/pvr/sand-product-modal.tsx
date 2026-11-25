import { useState } from "react";
import { X, Check, ShoppingCart, Plus, Minus, ShieldCheck, Package, Truck, Award } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

interface SandProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  sandImage?: string;
}

const SAND_TYPES = [
  {
    id: "Normal Sand",
    name: "Normal Sand",
    tag: "River & M-Sand",
    description: "Ideal for concrete foundations, masonry brickwork, and civil sub-base builds.",
  },
  {
    id: "Filter Sand",
    name: "Filter Sand",
    tag: "Washed Plastering",
    description: "Triple-screened fine grain sand for ultra-smooth wall plastering and zero-silt finishes.",
  },
];

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
    description: "Standard heavy tipper carrying approx. 18 to 20 metric tonnes of sand.",
  },
  {
    id: "12 Tyres",
    name: "12 Tyres Lorry",
    tag: "850 - 900 cft",
    description: "High-capacity mega tipper carrying approx. 24 to 26 metric tonnes of sand.",
  },
];

const TRACTOR_CAPACITIES = [
  {
    id: "Full Body",
    name: "Full Body Tractor",
    tag: "100 - 120 cft",
    description: "Standard full trailer load suitable for slab casting and foundation pours.",
  },
  {
    id: "Half Body",
    name: "Half Body Tractor",
    tag: "50 - 60 cft",
    description: "Compact half trailer load for small repairs, patching, and finishing work.",
  },
];

const PRESET_LOADS = [1, 2, 3, 5, 10];

export function SandProductModal({ isOpen, onClose, sandImage = "/images/sand-supply.jpg" }: SandProductModalProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [customInputValue, setCustomInputValue] = useState<string>("1");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setSelectedVehicle(null);
    setSelectedCapacity(null);
    setIsSuccess(false);
  };

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
    if (!selectedType || !selectedVehicle || !selectedCapacity) return;
    const finalQty = Math.max(1, quantity || 1);
    const unitLabel = finalQty === 1 ? "Load" : "Loads";

    addToCart({
      productName: "Sand Supply",
      type: `${selectedType} • ${selectedVehicle} (${selectedCapacity})`,
      quantity: finalQty,
      unit: unitLabel,
      image: sandImage,
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
        aria-labelledby="sand-modal-title"
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
          <h2 id="sand-modal-title" className="cement-modal-heading">
            Sand Supply
          </h2>
          <p className="cement-modal-desc">
            Select sand grade (Normal / Filter), choose delivery vehicle (Lorry / Tractor), pick capacity, and add directly to your cart.
          </p>
        </div>

        {/* 2-Column Body: Left = Product Info, Right = Cascading Options */}
        <div className="cement-modal-columns">
          {/* Left Column: Product Showcase */}
          <div className="cement-modal-product-col">
            <div className="cement-modal-photo-wrap">
              <img
                src={sandImage}
                alt="Sand Supply River and Filter Sand"
                className="cement-modal-photo"
              />
              <span className="cement-modal-idx-tag">03 | SAND</span>
              <div className="cement-modal-photo-tag">GRADED RIVER & M-SAND</div>
            </div>

            <div className="cement-modal-product-details">
              <div className="cement-modal-spec-pill">
                <span className="spec-dot" />
                <span>WASHED CONCRETE & PLASTER GRADE</span>
              </div>
              <h3 className="cement-modal-product-name">Sand Supply</h3>
              <p className="cement-modal-product-desc">
                Screened river sand and double-washed plastering sand tested for zero mud and low silt content to guarantee durable concrete bonding.
              </p>

              <div className="cement-modal-highlights">
                <div className="cement-highlight-item">
                  <Award className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Lab tested for silt & clay content (&lt;3%)</span>
                </div>
                <div className="cement-highlight-item">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Available in Normal & Filter Plastering Grades</span>
                </div>
                <div className="cement-highlight-item">
                  <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Lorry (10/12 Tyres) & Tractor (Full/Half) dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cascading Options */}
          <div className="cement-modal-options-col">
            {/* Step 1: Sand Type */}
            <div className="cement-step-block">
              <div className="cement-step-label-row">
                <span className="cement-step-num">1</span>
                <h3 className="cement-step-title">Select Sand Type</h3>
                {selectedType && (
                  <span className="cement-selected-badge">
                    Selected: <strong>{selectedType}</strong>
                  </span>
                )}
              </div>

              <div className="cement-type-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                {SAND_TYPES.map((t) => {
                  const isSelected = selectedType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`cement-type-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleTypeSelect(t.id)}
                    >
                      <div className="cement-type-top">
                        <span className="cement-type-name">{t.name}</span>
                      </div>
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

            {/* Step 2: Vehicle Selection (Lorry / Tractor) */}
            {selectedType && (
              <div className="cement-step-block animate-fade-in">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">2</span>
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
            )}

            {/* Step 3: Capacity Selection (10 Tyres/12 Tyres for Lorry; Full Body/Half Body for Tractor) */}
            {selectedVehicle && (
              <div className="cement-step-block animate-fade-in">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">3</span>
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

            {/* Step 4: Number of Loads Quantity */}
            {selectedCapacity && (
              <div className="cement-step-block animate-fade-in">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">4</span>
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
                      Sand Supply — <strong>{selectedType}</strong>
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
                  Added <strong>{quantity} {quantity === 1 ? "Load" : "Loads"} of {selectedType} ({selectedVehicle} {selectedCapacity})</strong> to Cart!
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
                disabled={!selectedType || !selectedVehicle || !selectedCapacity || quantity < 1}
                className="cement-add-btn"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                <span>
                  {selectedType && selectedVehicle && selectedCapacity
                    ? `Add ${quantity} ${quantity === 1 ? "Load" : "Loads"} (${selectedVehicle} ${selectedCapacity}) to Cart`
                    : "Select Type, Vehicle & Capacity to Continue"}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
