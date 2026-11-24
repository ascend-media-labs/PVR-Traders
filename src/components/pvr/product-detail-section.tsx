import { useState, useEffect } from "react";
import {
  Check,
  ShoppingCart,
  Plus,
  Minus,
  ShieldCheck,
  Package,
  Truck,
  Award,
  Layers3,
  Waves,
  Pickaxe,
  BrickWall,
  ArrowRight,
  Info,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

interface ProductDetailSectionProps {
  selectedIndex: number;
  onSelectProduct: (index: number) => void;
}

const PRODUCTS_DATA = [
  {
    id: "cement",
    index: 0,
    title: "Cement Supply",
    short: "Cement",
    tag: "GRADE 53 / 43 OPC & PPC",
    spec: "CERTIFIED HIGH-STRENGTH BINDER",
    icon: Package,
    image: "/images/cement-supply.jpg",
    description:
      "High-strength certified Portland & Pozzolana cement engineered for residential, commercial, and industrial foundation builds. Delivered in tamper-proof, moisture-resistant standard 50kg bags.",
    unit: "Packets",
    highlights: [
      "Standard 50kg moisture-resistant packaging",
      "IS 12269 & IS 1489 batch certified",
      "Punctual on-site delivery available",
      "Superior early setting & compressive bonding",
    ],
    technicalSpecs: [
      { label: "Grade / Strength", value: "53 Grade & 43 Grade Tested" },
      { label: "Bag Weight", value: "50 kg HDPE Moisture Barrier" },
      { label: "Standard", value: "IS 12269 / IS 1489 Certified" },
      { label: "Initial Setting", value: "30+ minutes (IS standard)" },
      { label: "Delivery Mode", value: "Covered Lorry / Mini Truck" },
    ],
    presetQuantities: [10, 25, 50, 100, 250],
    step1Title: "Select Cement Grade / Type",
    types: [
      {
        id: "OPC",
        name: "OPC",
        tag: "Grade 53 / 43",
        fullName: "OPC (Ordinary Portland)",
        description: "High-load structural concrete, foundations, columns & slabs.",
      },
      {
        id: "PPC",
        name: "PPC",
        tag: "Crack-Resistant",
        fullName: "PPC (Pozzolana Cement)",
        description: "Superior durability, plastering, masonry & coastal builds.",
      },
      {
        id: "HD",
        name: "HD",
        tag: "Industrial Strength",
        fullName: "HD (Heavy Duty)",
        description: "Engineered for heavy industrial yards, pavements & bridges.",
      },
      {
        id: "SUPER",
        name: "SUPER",
        tag: "Fast Setting",
        fullName: "SUPER (Super Grade)",
        description: "Ultra-fast setting strength for rapid construction turnaround.",
      },
    ],
  },
  {
    id: "steel",
    index: 1,
    title: "Iron & Steel Supply",
    short: "Iron & Steel",
    tag: "FE-550D TMT & STRUCTURALS",
    spec: "CORROSION-RESISTANT REINFORCEMENT",
    icon: Layers3,
    image: "/images/iron-steel-supply.jpg",
    description:
      "Superior ductility Fe-550D primary steel TMT rebars offering high earthquake resistance, high bendability, and corrosion-resistant thermal shielding.",
    unit: "Bars",
    highlights: [
      "Fe-550D primary billets with superior ductility",
      "IS 1786 batch tested & certified",
      "High earthquake & corrosion resistance",
      "Standard 12m length bundles & precision cuts",
    ],
    technicalSpecs: [
      { label: "Grade", value: "Fe-550D / Fe-500D TMT" },
      { label: "Standard Length", value: "12 Meters (40 Feet) per bar" },
      { label: "Certification", value: "IS 1786 High Yield Strength" },
      { label: "Rib Pattern", value: "Deep cross-ribbed for concrete grip" },
      { label: "Dispatch Vehicle", value: "Heavy Crane Truck / Trailer" },
    ],
    presetQuantities: [10, 25, 50, 100, 250],
    step1Title: "Select Bar Size / Diameter",
    types: [
      {
        id: "6",
        name: "6 mm",
        tag: "Stirrups & Rings",
        fullName: "6mm TMT Bar",
        description: "High ductility tie bars for beam and column stirrup cage binding.",
      },
      {
        id: "8",
        name: "8 mm",
        tag: "Slab Reinforce",
        fullName: "8mm TMT Bar",
        description: "Standard floor slab mesh and distribution rebar for residential homes.",
      },
      {
        id: "10",
        name: "10 mm",
        tag: "Columns & Beams",
        fullName: "10mm TMT Bar",
        description: "Main structural reinforcement rebar for load-bearing columns and beams.",
      },
      {
        id: "12",
        name: "12 mm",
        tag: "Heavy Structural",
        fullName: "12mm TMT Bar",
        description: "Heavy load-bearing structural reinforcement for multi-storey frames and footings.",
      },
    ],
  },
  {
    id: "sand",
    index: 2,
    title: "Sand Supply",
    short: "Sand",
    tag: "GRADED RIVER & M-SAND",
    spec: "WASHED CONCRETE & PLASTER GRADE",
    icon: Waves,
    image: "/images/sand-supply.jpg",
    description:
      "Screened river sand and double-washed plastering sand tested for zero mud and low silt content (<3%) to guarantee durable concrete bonding and crack-free wall finishes.",
    unit: "Loads",
    isCascadingVehicle: true,
    hasSandTypes: true,
    highlights: [
      "Lab tested for silt & clay content (<3%)",
      "Available in Normal & Filter Plastering grades",
      "Zero mud and washed fine grain texture",
      "Lorry (10/12 Tyres) & Tractor (Full/Half) dispatch",
    ],
    technicalSpecs: [
      { label: "Sand Grades", value: "River Sand & Screened M-Sand" },
      { label: "Silt Content", value: "< 3% (Lab Batch Tested)" },
      { label: "Applications", value: "Slab Concrete, Plastering, Masonry" },
      { label: "Lorry Capacity", value: "10 Tyres (650 cft) / 12 Tyres (850 cft)" },
      { label: "Tractor Capacity", value: "Full (110 cft) / Half (55 cft)" },
    ],
    presetQuantities: [1, 2, 3, 5, 10],
    sandTypes: [
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
    ],
  },
  {
    id: "stone",
    index: 3,
    title: "Crusher Chips Supply",
    short: "Crusher Chips",
    tag: "10MM / 20MM / 40MM",
    spec: "HIGH COMPRESSIVE AGGREGATE",
    icon: Pickaxe,
    image: "/images/stone-chips-supply.jpg",
    description:
      "High-grade blue granite crushed aggregates offering superior compressive strength and angularity for heavy structural concrete, beams, and highway foundations.",
    unit: "Loads",
    isCascadingVehicle: true,
    hasSandTypes: false,
    highlights: [
      "Crushed blue granite with high impact value",
      "Clean, machine-screened for optimal bonding",
      "10mm, 20mm & 40mm certified sizing",
      "Lorry (10/12 Tyres) & Tractor (Full/Half) dispatch",
    ],
    technicalSpecs: [
      { label: "Rock Type", value: "Hard Blue Granite" },
      { label: "Grading Sizes", value: "10mm, 20mm, 40mm Machine Screened" },
      { label: "Crushing Value", value: "< 24% (High Compressive Strength)" },
      { label: "Applications", value: "RCC Slabs, Beams, Columns, Road Base" },
      { label: "Delivery Fleet", value: "Heavy Tipper Lorries & Site Tractors" },
    ],
    presetQuantities: [1, 2, 3, 5, 10],
  },
  {
    id: "bricks",
    index: 4,
    title: "Cement Bricks Supply",
    short: "Cement Bricks",
    tag: "SOLID & HOLLOW BLOCKS",
    spec: "UNIFORM DENSITY & STRENGTH",
    icon: BrickWall,
    image: "/images/cement-bricks-supply.jpg",
    description:
      "High-strength hydraulic-pressed cement bricks and concrete blocks with razor-sharp edges, uniform dimensions, and low water absorption. Minimizes joint mortar and plastering thickness.",
    unit: "Loads",
    isCascadingVehicle: true,
    hasSandTypes: false,
    highlights: [
      "Hydraulic compressed for high compressive strength",
      "Reduces mortar consumption & plastering costs",
      "Uniform density and razor-sharp true edges",
      "Lorry (10/12 Tyres) & Tractor (Full/Half) dispatch",
    ],
    technicalSpecs: [
      { label: "Manufacturing", value: "High-Pressure Hydraulic Vibration" },
      { label: "Types Available", value: "Solid Blocks & Hollow Concrete Bricks" },
      { label: "Compressive Strength", value: "> 5 N/mm² Batch Tested" },
      { label: "Water Absorption", value: "< 10% (Crack & Damp Resistant)" },
      { label: "Lorry Batch", value: "Approx. 3,500 - 6,000 Bricks" },
    ],
    presetQuantities: [1, 2, 3, 5, 10],
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
    description: "Standard heavy tipper carrying approx. 18 to 20 metric tonnes.",
  },
  {
    id: "12 Tyres",
    name: "12 Tyres Lorry",
    tag: "850 - 900 cft",
    description: "High-capacity mega tipper carrying approx. 24 to 26 metric tonnes.",
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

export function ProductDetailSection({ selectedIndex = 2, onSelectProduct }: ProductDetailSectionProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const currentProduct = (PRODUCTS_DATA[selectedIndex] ?? PRODUCTS_DATA[0]) as (typeof PRODUCTS_DATA)[number];

  // Configurator states
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [customInputValue, setCustomInputValue] = useState<string>("1");
  const [isSuccess, setIsSuccess] = useState(false);

  // When selected product changes, reset configuration
  useEffect(() => {
    if (currentProduct.types && currentProduct.types.length > 0 && currentProduct.types[0]) {
      setSelectedType(currentProduct.types[0].id);
      const defaultQty = currentProduct.presetQuantities?.[1] ?? 25;
      setQuantity(defaultQty);
      setCustomInputValue(String(defaultQty));
    } else if (currentProduct.hasSandTypes && currentProduct.sandTypes && currentProduct.sandTypes.length > 0 && currentProduct.sandTypes[0]) {
      setSelectedType(currentProduct.sandTypes[0].id);
      setSelectedVehicle("Lorry");
      setSelectedCapacity("10 Tyres");
      setQuantity(1);
      setCustomInputValue("1");
    } else {
      setSelectedType(null);
      setSelectedVehicle("Lorry");
      setSelectedCapacity("10 Tyres");
      setQuantity(1);
      setCustomInputValue("1");
    }
    setIsSuccess(false);
  }, [selectedIndex, currentProduct]);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setIsSuccess(false);
  };

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setSelectedCapacity(vehicleId === "Lorry" ? "10 Tyres" : "Full Body");
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
    let orderType = "";
    if (currentProduct.hasSandTypes) {
      if (!selectedType || !selectedVehicle || !selectedCapacity) return;
      orderType = `${selectedType} • ${selectedVehicle} (${selectedCapacity})`;
    } else if (currentProduct.isCascadingVehicle) {
      if (!selectedVehicle || !selectedCapacity) return;
      orderType = `${selectedVehicle} (${selectedCapacity})`;
    } else {
      if (!selectedType) return;
      orderType = selectedType;
    }

    const finalQty = Math.max(1, quantity || 1);
    const unitLabel =
      currentProduct.unit === "Loads"
        ? finalQty === 1
          ? "Load"
          : "Loads"
        : currentProduct.unit;

    addToCart({
      productName: currentProduct.title,
      type: orderType,
      quantity: finalQty,
      unit: unitLabel,
      image: currentProduct.image,
    });
    setIsSuccess(true);
  };

  const capacityOptions =
    selectedVehicle === "Lorry"
      ? LORRY_CAPACITIES
      : selectedVehicle === "Tractor"
        ? TRACTOR_CAPACITIES
        : [];

  return (
    <section id="product-detail-section" className="product-in-detail-suite" aria-label="Product Specifications & Order">
      {/* Top Switcher Tab Bar: Select Any of the 5 Products */}
      <div className="product-switcher-bar">
        <span className="product-switcher-title">
          <Info className="w-3.5 h-3.5 text-sky-600 inline mr-1.5" />
          Select Product:
        </span>
        <div className="product-tabs-scroll">
          {PRODUCTS_DATA.map((p, idx) => {
            const Icon = p.icon;
            const isTabActive = idx === selectedIndex;
            return (
              <button
                key={p.id}
                type="button"
                className={`product-tab-pill ${isTabActive ? "active" : ""}`}
                onClick={() => onSelectProduct(idx)}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>
                  0{idx + 1} {p.short}
                </span>
                {isTabActive && <span className="tab-active-dot" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Detail Header */}
      <div className="product-detail-hero-header">
        <div className="product-detail-badge">
          <span className="badge-glow-dot" />
          <span>Product Specifications & Direct Procurement</span>
        </div>
        <h2 className="product-detail-main-title">{currentProduct.title}</h2>
        <p className="product-detail-main-desc">
          {currentProduct.description}
        </p>
      </div>

      {/* 2-Column Responsive Body */}
      <div className="in-page-columns">
        {/* Left Column: Rich Product Showcase & Technical Specs */}
        <div className="in-page-product-col">
          <div className="cement-modal-photo-wrap in-page-photo-wrap">
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="cement-modal-photo in-page-photo"
            />
            <span className="cement-modal-idx-tag">
              0{selectedIndex + 1} | {currentProduct.short.toUpperCase()}
            </span>
            <div className="cement-modal-photo-tag">{currentProduct.tag}</div>
          </div>

          <div className="cement-modal-product-details">
            <div className="cement-modal-spec-pill">
              <span className="spec-dot" />
              <span>{currentProduct.spec}</span>
            </div>

            {/* Technical Specs Table */}
            <div className="in-page-specs-table">
              <span className="specs-table-heading">Technical Benchmarks & Delivery</span>
              <div className="specs-table-grid">
                {currentProduct.technicalSpecs.map((spec) => (
                  <div className="specs-table-row" key={spec.label}>
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Badges */}
            <div className="cement-modal-highlights mt-3">
              {currentProduct.highlights.map((h, i) => (
                <div className="cement-highlight-item" key={i}>
                  {i === 0 ? (
                    <Award className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  ) : i === 1 ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  )}
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Order Configurator */}
        <div className="in-page-options-col">
          {/* Case 1: Sand Supply (Cascading: Type -> Vehicle -> Capacity -> Loads) */}
          {currentProduct.hasSandTypes && currentProduct.sandTypes && (
            <>
              {/* Step 1: Sand Type */}
              <div className="cement-step-block">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">1</span>
                  <h4 className="cement-step-title">Select Sand Grade</h4>
                  {selectedType && (
                    <span className="cement-selected-badge">
                      Selected: <strong>{selectedType}</strong>
                    </span>
                  )}
                </div>

                <div className="cement-type-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                  {currentProduct.sandTypes.map((t) => {
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
                          <span className="cement-type-tag">{t.tag}</span>
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

              {/* Step 2: Delivery Vehicle */}
              <div className="cement-step-block">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">2</span>
                  <h4 className="cement-step-title">Select Delivery Vehicle</h4>
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
                          <span className="cement-type-tag">{v.tag}</span>
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

              {/* Step 3: Vehicle Capacity */}
              <div className="cement-step-block">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">3</span>
                  <h4 className="cement-step-title">
                    {selectedVehicle === "Lorry" ? "Select Lorry Tyres / Capacity" : "Select Tractor Body Type"}
                  </h4>
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
                          <span className="cement-type-tag">{c.tag}</span>
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
            </>
          )}

          {/* Case 2: Crusher Chips & Cement Bricks (Vehicle -> Capacity -> Loads) */}
          {currentProduct.isCascadingVehicle && !currentProduct.hasSandTypes && (
            <>
              {/* Step 1: Delivery Vehicle */}
              <div className="cement-step-block">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">1</span>
                  <h4 className="cement-step-title">Select Delivery Vehicle</h4>
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
                          <span className="cement-type-tag">{v.tag}</span>
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

              {/* Step 2: Vehicle Capacity */}
              <div className="cement-step-block">
                <div className="cement-step-label-row">
                  <span className="cement-step-num">2</span>
                  <h4 className="cement-step-title">
                    {selectedVehicle === "Lorry" ? "Select Lorry Tyres / Capacity" : "Select Tractor Body Type"}
                  </h4>
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
                          <span className="cement-type-tag">{c.tag}</span>
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
            </>
          )}

          {/* Case 3: Cement Supply & Iron Steel (Direct Types / Sizes) */}
          {currentProduct.types && currentProduct.types.length > 0 && (
            <div className="cement-step-block">
              <div className="cement-step-label-row">
                <span className="cement-step-num">1</span>
                <h4 className="cement-step-title">{currentProduct.step1Title}</h4>
                {selectedType && (
                  <span className="cement-selected-badge">
                    Selected: <strong>{selectedType}</strong>
                  </span>
                )}
              </div>

              <div className="cement-type-grid">
                {currentProduct.types.map((t) => {
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
                        <span className="cement-type-tag">{t.tag}</span>
                      </div>
                      <span className="cement-type-fullname">{t.fullName}</span>
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
          )}

          {/* Quantity Step: Number of Loads / Packets / Bars */}
          <div className="cement-step-block">
            <div className="cement-step-label-row">
              <span className="cement-step-num">
                {currentProduct.hasSandTypes ? "4" : currentProduct.isCascadingVehicle ? "3" : "2"}
              </span>
              <h4 className="cement-step-title">Enter Quantity ({currentProduct.unit})</h4>
            </div>

            {/* Quick Presets */}
            <div className="cement-preset-row">
              <span className="cement-preset-label">Quick Select {currentProduct.unit}:</span>
              <div className="cement-preset-pills">
                {currentProduct.presetQuantities.map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    className={`cement-preset-btn ${quantity === qty ? "active" : ""}`}
                    onClick={() => handlePresetQuantity(qty)}
                  >
                    {qty} {qty === 1 && currentProduct.unit === "Loads" ? "Load" : currentProduct.unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Numeric Stepper */}
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
                  placeholder="e.g. 10, 25, 100..."
                />
                <button
                  type="button"
                  className="cement-stepper-btn"
                  aria-label="Increase quantity"
                  onClick={handleIncrement}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="cement-qty-unit-label">
                  {currentProduct.isCascadingVehicle ? selectedVehicle : ""} {quantity === 1 && currentProduct.unit === "Loads" ? "Load" : currentProduct.unit}
                </span>
              </div>
            </div>

            {/* Live Order Summary */}
            <div className="cement-order-summary-box">
              <div className="cement-summary-icon">
                <Package className="w-4 h-4 text-sky-500" />
              </div>
              <div className="cement-summary-details">
                <span className="cement-summary-title">
                  {currentProduct.title} {selectedType ? `— ${selectedType}` : ""}
                </span>
                <span className="cement-summary-qty">
                  {currentProduct.isCascadingVehicle ? `Vehicle: ${selectedVehicle} (${selectedCapacity}) • ` : ""}
                  Total Quantity: <strong>{quantity} {quantity === 1 && currentProduct.unit === "Loads" ? "Load" : currentProduct.unit}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Row & Add to Cart */}
          <div className="in-page-action-container">
            {isSuccess ? (
              <div className="cement-success-bar in-page-success-bar">
                <div className="cement-success-message">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>
                    Added <strong>{quantity} {quantity === 1 && currentProduct.unit === "Loads" ? "Load" : currentProduct.unit} of {currentProduct.title}</strong> to your Cart!
                  </span>
                </div>
                <div className="cement-success-actions">
                  <Button
                    size="sm"
                    className="in-page-view-cart-btn text-white font-semibold"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                    View Material Cart
                  </Button>
                </div>
              </div>
            ) : (
              <div className="in-page-submit-row">
                <Button className="cement-add-btn in-page-add-btn" onClick={handleAddToCart}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  <span>
                    Add {quantity} {quantity === 1 && currentProduct.unit === "Loads" ? "Load" : currentProduct.unit} to Cart
                  </span>
                  <ChevronRight className="w-4 h-4 ml-1.5 opacity-80" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
