export type Category =
  | "Domestic Water Filters"
  | "Commercial RO Systems"
  | "Industrial Water Treatment"
  | "Water Softeners"
  | "RO Spare Parts"
  | "Filter Cartridges";

export const CATEGORIES: Category[] = [
  "Domestic Water Filters",
  "Commercial RO Systems",
  "Industrial Water Treatment",
  "Water Softeners",
  "RO Spare Parts",
  "Filter Cartridges",
];

export interface Product {
  id: string;
  name: string;
  category: Category;
  model: string;
  shortDescription: string;
  overview: string;
  image: string;
  gallery: string[];
  features: string[];
  specs: { label: string; value: string }[];
  applications: string[];
  benefits: string[];
  keywords: string[];
}

// Actual hardware and equipment imagery (Unsplash direct URLs)
const HARDWARE_IMG = {
  // Domestic Equipment
  underSinkRO: "https://purewatersystems.com.au/cdn/shop/files/ROUS5-F1-2025.jpg?v=1755468069&width=1946", // Under-sink filtration setup
  alkalineRO: "https://i0.wp.com/aquafilter.pk/wp-content/uploads/2025/02/AQUA-8-STAGES-RO-PAKSTAN.jpg?fit=1280%2C1280&ssl=1", // Modern multi-stage purification hardware
  countertopUnit: "https://aqualineuk.com/wp-content/uploads/2023/09/02-1.jpg", // Countertop dispenser/purifier unit
  wholeHouseHousing: "https://proaquawater.com/cdn/shop/files/PRO-100-E_Hero2.jpg?v=1738004975&width=2625", // Whole-house blue filter housings & piping

  // Commercial Systems
  commercialRo500: "https://aquaprouae.ae/images/product/commercial-ro-200-GPD.jpg", // Wall-mount commercial RO assembly
  commercialRoSkid1500: "https://i0.wp.com/aquafilter.pk/wp-content/uploads/2025/08/1000411125.jpg?fit=430%2C573&ssl=1", // Compact commercial skid frame
  commercialRoSkid3000: "https://www.pureaquauae.com/wp-content/uploads/2021/01/3000-GPD-1200x1200.jpg", // High-output commercial skid with pressure vessels

  // Industrial Systems
  industrialRoPlant: "https://aquafilter.pk/wp-content/uploads/2023/12/commercial-ro-planT.webp", // Large industrial treatment plant & skid
  dmDeionizerPlant: "https://www.crownfiltech.com/assets/dm-plant-Deplpnaa.jpg", // Process water vessel plant
  ultrafiltrationPlant: "https://aquaphorpro.com/media/__sized__/sub_products/products/APUF_2000_1_1000-crop-c0-5__0-5-700x700.png", // Industrial membrane array

  // Softeners
  residentialSoftenerTank: "https://innovativeengineeringindia.com/wp-content/uploads/2024/11/Aquasoft-2000.jpg", // Compact home softener cabinet
  commercialTwinSoftener: "https://images.jdmagicbox.com/quickquotes/images_main/automatic-water-softeners-2216018655-tx6y2n1c.jpg", // Commercial FRP twin-tank assembly

  // Spare Parts & Components
  roMembraneElement: "https://pk-live-21.slatic.net/kf/S28f13974741d4088a3c29ce97bf0d7fd0.jpg", // Wound spiral RO membrane element
  boosterPumpMotor: "https://sc04.alicdn.com/kf/Hf6c39fc3ac0f498087418907596c4bf3T.jpg", // Diaphragm booster pump assembly
  pressureTank: "https://axtronpakistan.com/wp-content/uploads/2026/04/IMG_0417-edited-7.webp", // Steel pressure storage tank
  digitalTdsTester: "https://electrobes.com/wp-content/uploads/2025/08/digital-water-ph-tester-0-14-measuring-value-0-01-high-accuracy-ph-meter-at-best-price-in-pakistan.jpg?v=1758713271", // Water quality testing meter

  // Cartridges
  ppSedimentFilter: "https://www.simpurelife.com/cdn/shop/files/1025ppwaterfilter.jpg?v=1716863005", // Melt-blown PP sediment cartridge
  carbonBlockCTO: "https://pearlwater.in/assets/siteimages/product/1671098887_5263db7bc94fe9d10cfd.jpg", // Activated carbon block cartridge
  ufInlineModule: "https://5.imimg.com/data5/ANDROID/Default/2024/6/425636147/RT/IS/GP/125417554/product-jpeg.jpg", // Inline membrane module
  mineralCartridgeInline: "https://www.filter-future.com/uploads/40126/alkaline-water-filter-cartridge-for-ro-system2779f.jpg", // Post-RO mineralizing cartridge

  // Detailed Supporting Hardware Shots for Galleries
  hardwarePipes: "https://images.unsplash.com/photo-1585687501004-615dfdfde7f1?w=1200&q=80",
  hardwareTech: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1200&q=80",
  hardwareFittings: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&q=80",
};

const genSpecs = (extra: { label: string; value: string }[] = []) => [
  { label: "Certifications", value: "NSF / WQA / ISO 9001" },
  { label: "Warranty", value: "2 Years Limited" },
  { label: "Operating Pressure", value: "40 – 80 PSI" },
  { label: "Operating Temperature", value: "4°C – 40°C" },
  ...extra,
];

const genApps = (list?: string[]) =>
  list ?? [
    "Residential kitchens & drinking water lines",
    "Restaurants, cafes and hospitality",
    "Offices and small commercial spaces",
    "Schools, clinics and community facilities",
  ];

const genBenefits = (list?: string[]) =>
  list ?? [
    "Removes chlorine, heavy metals and sediments",
    "Improves taste, clarity and odor",
    "Reduces plastic bottle waste",
    "Low maintenance with long cartridge life",
  ];

export const PRODUCTS: Product[] = [
  // Domestic Water Filters
  {
    id: "aqua-pure-6",
    name: "AquaPure 6-Stage Under-Sink RO",
    category: "Domestic Water Filters",
    model: "AC-DP6-75G",
    shortDescription: "6-stage reverse osmosis system with mineral boost for everyday drinking water.",
    overview:
      "The AquaPure 6-Stage delivers ultra-pure drinking water through sediment, carbon block, RO membrane and mineral post-filtration stages. Designed for compact installation under any kitchen sink.",
    image: HARDWARE_IMG.underSinkRO,
    gallery: [
      HARDWARE_IMG.underSinkRO,
      HARDWARE_IMG.roMembraneElement,
      HARDWARE_IMG.pressureTank,
      HARDWARE_IMG.mineralCartridgeInline,
    ],
    features: [
      "6-stage advanced purification",
      "75 GPD high-flow RO membrane",
      "Mineral cartridge for balanced pH",
      "Quick-change twist filters",
      "Leak detection base",
    ],
    specs: genSpecs([
      { label: "Production", value: "75 Gallons / day" },
      { label: "Tank Capacity", value: "3.2 Gallons" },
      { label: "Dimensions", value: "38 × 22 × 45 cm" },
    ]),
    applications: genApps(),
    benefits: genBenefits(),
    keywords: ["ro", "under sink", "domestic", "6 stage", "mineral"],
  },
  {
    id: "aqua-pure-8",
    name: "AquaPure Alkaline 8-Stage",
    category: "Domestic Water Filters",
    model: "AC-DP8-ALK",
    shortDescription: "Premium alkaline drinking system with 8 filtration stages and UV.",
    overview: "Delivers alkaline, mineral-balanced drinking water with UV sterilization for the modern kitchen.",
    image: HARDWARE_IMG.alkalineRO,
    gallery: [
      HARDWARE_IMG.alkalineRO,
      HARDWARE_IMG.mineralCartridgeInline,
      HARDWARE_IMG.roMembraneElement,
      HARDWARE_IMG.digitalTdsTester,
    ],
    features: ["Alkaline & antioxidant stage", "Built-in UV sterilizer", "TDS controller", "Smart LED filter life indicator"],
    specs: genSpecs([{ label: "Stages", value: "8" }, { label: "pH Range", value: "8.0 – 9.5" }]),
    applications: genApps(),
    benefits: genBenefits(),
    keywords: ["alkaline", "uv", "premium", "domestic"],
  },
  {
    id: "aqua-counter-top",
    name: "AquaLine Countertop Purifier",
    category: "Domestic Water Filters",
    model: "AC-CT-3",
    shortDescription: "No-install countertop unit — connects directly to any standard faucet.",
    overview: "A slim countertop purifier for renters and small kitchens. Installs in minutes with the included diverter.",
    image: HARDWARE_IMG.countertopUnit,
    gallery: [
      HARDWARE_IMG.countertopUnit,
      HARDWARE_IMG.ppSedimentFilter,
      HARDWARE_IMG.carbonBlockCTO,
      HARDWARE_IMG.hardwareFittings,
    ],
    features: ["No plumbing required", "3-stage filtration", "Compact footprint", "Universal faucet adapter"],
    specs: genSpecs([{ label: "Flow Rate", value: "1.5 L / min" }]),
    applications: genApps(["Rental homes", "Apartments", "Dorm rooms", "Small offices"]),
    benefits: genBenefits(),
    keywords: ["countertop", "portable", "faucet"],
  },
  {
    id: "aqua-whole-home",
    name: "AquaShield Whole-House Filter",
    category: "Domestic Water Filters",
    model: "AC-WH-BB20",
    shortDescription: "Point-of-entry big-blue filtration for every tap in the house.",
    overview: "Protects plumbing and appliances by removing sediment, rust and chlorine at the main water line.",
    image: HARDWARE_IMG.wholeHouseHousing,
    gallery: [
      HARDWARE_IMG.wholeHouseHousing,
      HARDWARE_IMG.ppSedimentFilter,
      HARDWARE_IMG.carbonBlockCTO,
      HARDWARE_IMG.hardwarePipes,
    ],
    features: ["Twin big-blue housings", "Sediment + carbon combo", "Bypass valves included", "Pressure gauges"],
    specs: genSpecs([{ label: "Flow Rate", value: "15 GPM" }, { label: "Housing", value: '20" × 4.5"' }]),
    applications: genApps(["Villas", "Duplexes", "Small buildings", "Farmhouses"]),
    benefits: genBenefits(["Protects boilers, washers & fixtures", "Cleaner shower & laundry water", "Extends appliance life"]),
    keywords: ["whole house", "big blue", "point of entry"],
  },

  // Commercial RO
  {
    id: "aqua-com-500",
    name: "AquaFlow Commercial RO 500 GPD",
    category: "Commercial RO Systems",
    model: "AC-CR-500",
    shortDescription: "Wall-mounted commercial RO for cafes and small restaurants.",
    overview: "A compact, high-output commercial RO unit tuned for consistent water quality in food service.",
    image: HARDWARE_IMG.commercialRo500,
    gallery: [
      HARDWARE_IMG.commercialRo500,
      HARDWARE_IMG.boosterPumpMotor,
      HARDWARE_IMG.roMembraneElement,
      HARDWARE_IMG.hardwarePipes,
    ],
    features: ["500 GPD output", "Booster pump included", "Automatic flush", "Stainless housing"],
    specs: genSpecs([{ label: "Production", value: "500 GPD" }, { label: "Recovery", value: "45%" }]),
    applications: genApps(["Cafes & coffee shops", "Bakeries", "Small restaurants", "Ice machines"]),
    benefits: genBenefits(["Consistent taste in beverages", "Protects espresso boilers", "Reduces scale buildup"]),
    keywords: ["commercial", "ro", "cafe", "restaurant"],
  },
  {
    id: "aqua-com-1500",
    name: "AquaFlow Commercial RO 1500 GPD",
    category: "Commercial RO Systems",
    model: "AC-CR-1500",
    shortDescription: "Mid-scale RO plant with skid frame and digital controller.",
    overview: "Skid-mounted 1500 GPD RO plant with PLC controls, ideal for hotels and mid-size kitchens.",
    image: HARDWARE_IMG.commercialRoSkid1500,
    gallery: [
      HARDWARE_IMG.commercialRoSkid1500,
      HARDWARE_IMG.hardwareTech,
      HARDWARE_IMG.hardwarePipes,
      HARDWARE_IMG.roMembraneElement,
    ],
    features: ["PLC digital controller", "Dual membrane housing", "Anti-scalant dosing port", "Powder-coated skid"],
    specs: genSpecs([{ label: "Production", value: "1500 GPD" }, { label: "Membranes", value: "2 × 4040" }]),
    applications: genApps(["Hotels", "Hospitals", "Schools", "Community kitchens"]),
    benefits: genBenefits(),
    keywords: ["commercial", "skid", "plc", "hotel"],
  },
  {
    id: "aqua-com-3000",
    name: "AquaFlow Commercial RO 3000 GPD",
    category: "Commercial RO Systems",
    model: "AC-CR-3000",
    shortDescription: "High-capacity commercial plant with automated CIP.",
    overview: "3000 GPD output with clean-in-place system for demanding commercial installations.",
    image: HARDWARE_IMG.commercialRoSkid3000,
    gallery: [
      HARDWARE_IMG.commercialRoSkid3000,
      HARDWARE_IMG.industrialRoPlant,
      HARDWARE_IMG.hardwarePipes,
      HARDWARE_IMG.hardwareTech,
    ],
    features: ["3000 GPD", "Automated CIP cycle", "TDS & pressure monitoring", "Remote alarm output"],
    specs: genSpecs([{ label: "Production", value: "3000 GPD" }, { label: "Recovery", value: "55%" }]),
    applications: genApps(["Large hotels", "Manufacturing pantries", "Bottling lines"]),
    benefits: genBenefits(),
    keywords: ["commercial", "3000", "cip"],
  },

  // Industrial
  {
    id: "aqua-ind-plant",
    name: "AquaCore Industrial RO Plant",
    category: "Industrial Water Treatment",
    model: "AC-IND-10K",
    shortDescription: "10,000 GPD industrial RO plant with pretreatment train.",
    overview: "Engineered industrial RO system with sand, carbon and softener pretreatment for reliable 24/7 operation.",
    image: HARDWARE_IMG.industrialRoPlant,
    gallery: [
      HARDWARE_IMG.industrialRoPlant,
      HARDWARE_IMG.commercialRoSkid3000,
      HARDWARE_IMG.hardwarePipes,
      HARDWARE_IMG.hardwareTech,
    ],
    features: ["10,000 GPD", "Full pretreatment train", "SS 304 skid", "SCADA-ready control panel"],
    specs: genSpecs([{ label: "Production", value: "10,000 GPD" }, { label: "Pretreatment", value: "Sand + Carbon + Softener" }]),
    applications: genApps(["Manufacturing", "Food & beverage", "Textile", "Pharma utilities"]),
    benefits: genBenefits(["Continuous industrial-grade output", "Low downtime maintenance", "Meets process water specs"]),
    keywords: ["industrial", "plant", "10000"],
  },
  {
    id: "aqua-ind-dm",
    name: "AquaCore DM Plant",
    category: "Industrial Water Treatment",
    model: "AC-DM-2000",
    shortDescription: "Two-bed demineralization plant for boiler feed water.",
    overview: "Cation + anion demineralization plant producing near-zero TDS water for industrial process needs.",
    image: HARDWARE_IMG.dmDeionizerPlant,
    gallery: [
      HARDWARE_IMG.dmDeionizerPlant,
      HARDWARE_IMG.digitalTdsTester,
      HARDWARE_IMG.industrialRoPlant,
      HARDWARE_IMG.hardwarePipes,
    ],
    features: ["Cation + anion vessels", "FRP construction", "Manual/auto regeneration", "Conductivity meter"],
    specs: genSpecs([{ label: "Output TDS", value: "< 5 ppm" }, { label: "Capacity", value: "2 m³ / hr" }]),
    applications: genApps(["Boiler feed", "Pharma", "Chemical plants", "Laboratories"]),
    benefits: genBenefits(["Ultra-low TDS output", "Protects boilers", "Custom regeneration schedules"]),
    keywords: ["dm plant", "boiler", "industrial"],
  },
  {
    id: "aqua-ind-uf",
    name: "AquaCore Ultrafiltration System",
    category: "Industrial Water Treatment",
    model: "AC-UF-5000",
    shortDescription: "Hollow-fiber UF plant for turbidity and pathogen removal.",
    overview: "Industrial UF plant with automatic backwash for surface & borewell water treatment.",
    image: HARDWARE_IMG.ultrafiltrationPlant,
    gallery: [
      HARDWARE_IMG.ultrafiltrationPlant,
      HARDWARE_IMG.industrialRoPlant,
      HARDWARE_IMG.ufInlineModule,
      HARDWARE_IMG.hardwarePipes,
    ],
    features: ["Hollow-fiber membranes", "Auto backwash cycle", "0.02 µm filtration", "Compact footprint"],
    specs: genSpecs([{ label: "Capacity", value: "5 m³ / hr" }, { label: "Pore Size", value: "0.02 µm" }]),
    applications: genApps(["Municipal", "Beverage", "Swimming pools", "Aquaculture"]),
    benefits: genBenefits(),
    keywords: ["ultrafiltration", "uf", "industrial"],
  },

  // Softeners
  {
    id: "aqua-soft-r",
    name: "AquaSoft Residential Softener",
    category: "Water Softeners",
    model: "AC-SF-R25",
    shortDescription: "25-liter residential softener with digital valve.",
    overview: "Ion-exchange residential softener with a smart digital valve for reliable soft water throughout the home.",
    image: HARDWARE_IMG.residentialSoftenerTank,
    gallery: [
      HARDWARE_IMG.residentialSoftenerTank,
      HARDWARE_IMG.hardwarePipes,
      HARDWARE_IMG.hardwareTech,
      HARDWARE_IMG.hardwareFittings,
    ],
    features: ["Digital metered valve", "FRP tank & brine tank", "Auto regeneration", "Bypass valve"],
    specs: genSpecs([{ label: "Resin", value: "25 L" }, { label: "Peak Flow", value: "1.5 m³ / hr" }]),
    applications: genApps(["Villas", "Apartments", "Small salons"]),
    benefits: genBenefits(["Softer skin & hair", "No scale in showers", "Longer appliance life"]),
    keywords: ["softener", "residential", "ion exchange"],
  },
  {
    id: "aqua-soft-c",
    name: "AquaSoft Commercial Softener",
    category: "Water Softeners",
    model: "AC-SF-C100",
    shortDescription: "100-liter twin-tank softener for laundries and hotels.",
    overview: "Twin-tank commercial softener that provides continuous soft water during regeneration cycles.",
    image: HARDWARE_IMG.commercialTwinSoftener,
    gallery: [
      HARDWARE_IMG.commercialTwinSoftener,
      HARDWARE_IMG.hardwarePipes,
      HARDWARE_IMG.industrialRoPlant,
      HARDWARE_IMG.hardwareTech,
    ],
    features: ["Twin-tank continuous flow", "Meter-based regeneration", "High-capacity resin", "Stainless piping"],
    specs: genSpecs([{ label: "Resin", value: "100 L × 2" }, { label: "Peak Flow", value: "6 m³ / hr" }]),
    applications: genApps(["Hotels", "Laundries", "Salons & spas", "Restaurants"]),
    benefits: genBenefits(),
    keywords: ["softener", "commercial", "twin tank"],
  },

  // Spare Parts
  {
    id: "aqua-membrane-75",
    name: "RO Membrane 75 GPD",
    category: "RO Spare Parts",
    model: "AC-MEM-75",
    shortDescription: "Genuine replacement RO membrane for domestic systems.",
    overview: "High-rejection thin-film composite membrane compatible with most under-sink RO systems.",
    image: HARDWARE_IMG.roMembraneElement,
    gallery: [
      HARDWARE_IMG.roMembraneElement,
      HARDWARE_IMG.underSinkRO,
      HARDWARE_IMG.hardwareFittings,
      HARDWARE_IMG.ppSedimentFilter,
    ],
    features: ["96% TDS rejection", "TFC construction", "Standard 1812 size", "1-year performance warranty"],
    specs: genSpecs([{ label: "Rejection", value: "96%" }, { label: "Size", value: '1812"' }]),
    applications: genApps(["Domestic RO replacement", "Countertop units"]),
    benefits: genBenefits(),
    keywords: ["membrane", "spare", "75 gpd"],
  },
  {
    id: "aqua-booster-pump",
    name: "RO Booster Pump 100 GPD",
    category: "RO Spare Parts",
    model: "AC-BP-100",
    shortDescription: "Compact booster pump for low-pressure RO installations.",
    overview: "Boosts inlet pressure for consistent RO performance where line pressure is inadequate.",
    image: HARDWARE_IMG.boosterPumpMotor,
    gallery: [
      HARDWARE_IMG.boosterPumpMotor,
      HARDWARE_IMG.hardwareFittings,
      HARDWARE_IMG.hardwarePipes,
      HARDWARE_IMG.underSinkRO,
    ],
    features: ["24V DC operation", "Silent brushless motor", "Auto shut-off compatible", "Stainless head"],
    specs: genSpecs([{ label: "Voltage", value: "24V DC" }, { label: "Flow", value: "1.2 L / min" }]),
    applications: genApps(["Low-pressure homes", "Apartments", "Villas"]),
    benefits: genBenefits(),
    keywords: ["booster", "pump", "spare"],
  },
  {
    id: "aqua-storage-tank",
    name: "RO Storage Tank 3.2 G",
    category: "RO Spare Parts",
    model: "AC-TK-32",
    shortDescription: "Pressurized storage tank for under-sink RO systems.",
    overview: "Corrosion-resistant steel storage tank with butyl bladder for domestic RO systems.",
    image: HARDWARE_IMG.pressureTank,
    gallery: [
      HARDWARE_IMG.pressureTank,
      HARDWARE_IMG.underSinkRO,
      HARDWARE_IMG.hardwareFittings,
      HARDWARE_IMG.hardwarePipes,
    ],
    features: ["3.2 gallon capacity", "Butyl food-grade bladder", "Steel exterior", "1/4\" NPT outlet"],
    specs: genSpecs([{ label: "Capacity", value: "3.2 gallons" }, { label: "Working Pressure", value: "8 – 10 PSI" }]),
    applications: genApps(["Under-sink RO", "Countertop RO"]),
    benefits: genBenefits(),
    keywords: ["tank", "storage", "spare"],
  },
  {
    id: "aqua-tds-meter",
    name: "Digital TDS & pH Meter",
    category: "RO Spare Parts",
    model: "AC-TDS-01",
    shortDescription: "Handheld water quality tester for installers and homeowners.",
    overview: "Pocket-sized TDS + pH meter with auto temperature compensation.",
    image: HARDWARE_IMG.digitalTdsTester,
    gallery: [
      HARDWARE_IMG.digitalTdsTester,
      HARDWARE_IMG.hardwareTech,
      HARDWARE_IMG.underSinkRO,
      HARDWARE_IMG.alkalineRO,
    ],
    features: ["TDS 0 – 9999 ppm", "pH 0 – 14", "Auto temp compensation", "LCD display"],
    specs: genSpecs([{ label: "Accuracy", value: "±2%" }]),
    applications: genApps(["Field service", "Homeowners", "Installers"]),
    benefits: genBenefits(),
    keywords: ["tds", "meter", "spare"],
  },

  // Cartridges
  {
    id: "aqua-cart-sediment",
    name: "PP Sediment Cartridge 5 µm",
    category: "Filter Cartridges",
    model: "AC-CT-PP5",
    shortDescription: "First-stage sediment filter for RO and whole-house systems.",
    overview: "High-capacity spun polypropylene cartridge for effective removal of sand, silt and rust.",
    image: HARDWARE_IMG.ppSedimentFilter,
    gallery: [
      HARDWARE_IMG.ppSedimentFilter,
      HARDWARE_IMG.wholeHouseHousing,
      HARDWARE_IMG.carbonBlockCTO,
      HARDWARE_IMG.hardwarePipes,
    ],
    features: ["5-micron rating", "Spun PP construction", '10" standard length', "Food-grade materials"],
    specs: genSpecs([{ label: "Micron", value: "5 µm" }, { label: "Length", value: '10"' }]),
    applications: genApps(["Pre-filter for RO", "Sediment removal", "Well water"]),
    benefits: genBenefits(),
    keywords: ["sediment", "cartridge", "pp"],
  },
  {
    id: "aqua-cart-cto",
    name: "Carbon Block CTO 10\"",
    category: "Filter Cartridges",
    model: "AC-CT-CTO10",
    shortDescription: "Coconut-shell carbon block for chlorine and odor removal.",
    overview: "Premium extruded carbon block that removes chlorine, taste and odor without releasing carbon fines.",
    image: HARDWARE_IMG.carbonBlockCTO,
    gallery: [
      HARDWARE_IMG.carbonBlockCTO,
      HARDWARE_IMG.ppSedimentFilter,
      HARDWARE_IMG.wholeHouseHousing,
      HARDWARE_IMG.hardwarePipes,
    ],
    features: ["Coconut shell activated carbon", "Extruded block design", "Chlorine reduction 99%", '10" standard'],
    specs: genSpecs([{ label: "Micron", value: "5 µm" }, { label: "Length", value: '10"' }]),
    applications: genApps(["Chlorine removal", "Pre & post RO", "Whole-house"]),
    benefits: genBenefits(),
    keywords: ["carbon", "cto", "cartridge"],
  },
  {
    id: "aqua-cart-uf",
    name: "UF Membrane Cartridge",
    category: "Filter Cartridges",
    model: "AC-CT-UF",
    shortDescription: "Ultrafiltration cartridge for bacteria and cyst reduction.",
    overview: "Hollow-fiber UF cartridge suitable for standalone or post-RO installations.",
    image: HARDWARE_IMG.ufInlineModule,
    gallery: [
      HARDWARE_IMG.ufInlineModule,
      HARDWARE_IMG.roMembraneElement,
      HARDWARE_IMG.mineralCartridgeInline,
      HARDWARE_IMG.hardwareFittings,
    ],
    features: ["0.01 µm hollow fiber", "Bacteria & cyst removal", "Long service life", "Standard inline fitting"],
    specs: genSpecs([{ label: "Micron", value: "0.01 µm" }]),
    applications: genApps(["Post-RO polishing", "Gravity purifiers"]),
    benefits: genBenefits(),
    keywords: ["uf", "cartridge", "ultrafiltration"],
  },
  {
    id: "aqua-cart-mineral",
    name: "Mineral & Alkaline Cartridge",
    category: "Filter Cartridges",
    model: "AC-CT-MIN",
    shortDescription: "Post-RO mineral cartridge that restores healthy minerals.",
    overview: "Balances pH and reintroduces essential minerals — calcium, magnesium, potassium — into RO water.",
    image: HARDWARE_IMG.mineralCartridgeInline,
    gallery: [
      HARDWARE_IMG.mineralCartridgeInline,
      HARDWARE_IMG.alkalineRO,
      HARDWARE_IMG.underSinkRO,
      HARDWARE_IMG.hardwareFittings,
    ],
    features: ["Balances pH to 8.0 – 9.5", "Adds Ca, Mg, K", "Inline post-RO", "Long lifespan"],
    specs: genSpecs([{ label: "Life", value: "12 months" }]),
    applications: genApps(["Post-RO polishing", "Alkaline systems"]),
    benefits: genBenefits(),
    keywords: ["mineral", "alkaline", "cartridge"],
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const relatedProducts = (id: string, category: Category, n = 3) =>
  PRODUCTS.filter((p) => p.id !== id && p.category === category).slice(0, n);