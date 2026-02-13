import { staticFile } from "remotion";

// ============================================================
// COLORS (matching global palette)
// ============================================================
export const TECH_BLUE = "#0052FF";
export const WARNING_RED = "#FF3B30";
export const WARNING_ORANGE = "#FF9500";
export const SUCCESS_GREEN = "#34C759";
export const TEXT_DARK = "#0A0A0B";
export const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// ============================================================
// SCENE 5 MAIN IMAGES (Uganda - Duties & Taxes)
// ============================================================
export const IMG_MISTAKE_5_INTRO = staticFile("assets/global/sence_5_assets/buyer_confued_hidden_charge.png");
export const IMG_CAR_PRICE = staticFile("assets/global/sence_5_assets/car_price.png");
export const IMG_LANDED_VALUE = staticFile("assets/global/sence_5_assets/landed_value_breakdown.png");
export const IMG_FULL_INVOICE = staticFile("assets/global/sence_5_assets/full_invoice_clearity.png");
export const IMG_BUDGET_SHIPPING = staticFile("assets/global/sence_5_assets/budget_before_shipping.png");
export const IMG_GUIDED_PROCESS = staticFile("assets/global/sence_5_assets/guided_import_processs.png");
export const IMG_TRANSPARENCY = staticFile("assets/global/sence_5_assets/trust_and_trasparancey.png");
export const IMG_SOUTH_SUDAN_PORT = staticFile("assets/carbarn_south_sudan/port.webp");

// ============================================================
// LOTTIE ANIMATIONS
// ============================================================
export const LOTTIE_ALERT = staticFile("assets/global/animated_icons/Alert.json");
export const LOTTIE_BILLING = staticFile("assets/global/animated_icons/billing.json");
export const LOTTIE_SHIELD = staticFile("assets/global/animated_icons/Shield.json");
export const LOTTIE_SUCCESS = staticFile("assets/global/animated_icons/Success.json");
export const LOTTIE_SHIPPING = staticFile("assets/global/animated_icons/Shipping.json");
export const LOTTIE_ANALYTICS = staticFile("assets/global/animated_icons/analytics.json");
export const LOTTIE_VALIDATION = staticFile("assets/global/animated_icons/Validation.json");

// ============================================================
// REGION TOGGLE
// ============================================================
export const CURRENT_REGION: string = 'UGANDA';

// ============================================================
// CARBARN LOGO
// ============================================================
export const LOGO = staticFile("assets/carbarn_uganda/main_logo.webp");

// ============================================================
// SCENE 5 TIMINGS (frames @ 30fps)
// Script metadata timing converted to frames:
// Total duration: 29.954 seconds = ~899 frames @ 30fps
// ============================================================

// Sentence 1: "Ensobi ey’okutaano: Obutategeera nsonga za misolo—n’ogenda"
// Duration: 4.755s = 143 frames
export const SCENE5_LINE1_DUR = 143;

// Sentence 2: "okwekanga e Mombasa nga bakuwadde ebbanga lya ssente."
// Duration: 4.755s = 143 frames
export const SCENE5_LINE2_DUR = 143;

// Sentence 3: "Wano, emisolo gisinziira ku bunene bwa yingini ne 'dutiable value', era"
// Duration: 5.665s = 170 frames
export const SCENE5_LINE3_DUR = 170;

// Sentence 4: "abaguzi batera okukwatibwa kubanga balowooza ku bbeeyi ya mmotoka yokka."
// Duration: 5.665s = 170 frames
export const SCENE5_LINE4_DUR = 170;

// Sentence 5: "Carbarn ekuyamba n’ekuwa 'invoice' erimu byonna n’okukulungamya"
// Duration: 4.557s = 137 frames
export const SCENE5_LINE5_DUR = 137;

// Sentence 6: "ku by’emisolo, obudde n’obubala bulungi nga mmotoka tennyisibwa."
// Duration: 4.557s = 136 frames
export const SCENE5_LINE6_DUR = 136;

// Sentence 7: Skipped for Uganda
export const SCENE5_LINE7_DUR = 0;

export const SCENE5_TOTAL_DUR =
  SCENE5_LINE1_DUR +
  SCENE5_LINE2_DUR +
  SCENE5_LINE3_DUR +
  SCENE5_LINE4_DUR +
  SCENE5_LINE5_DUR +
  SCENE5_LINE6_DUR +
  SCENE5_LINE7_DUR;
