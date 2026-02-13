import { staticFile } from "remotion";

// ============================================================
// COLORS & THEME (Scene 6)
// ============================================================
export const TECH_BLUE = "#0052FF";
export const WARNING_RED = "#FF3B3B";
export const SUCCESS_GREEN = "#00C853";
export const SLATE_BG = "#F8FAFC";
export const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// ============================================================
// SCENE 6 MAIN IMAGES
// ============================================================
export const IMG_SECURE_PAYMENT = staticFile("assets/global/sence_6_assets/secure_payment.png");
export const IMG_BANK_TRANSFER = staticFile("assets/global/sence_6_assets/choosing_bank_transfer.png");
export const IMG_CREDIT_CARD = staticFile("assets/global/sence_6_assets/band_simple_direct_traceable.png");
export const IMG_CONFIRMATION = staticFile("assets/global/sence_6_assets/transactons_confermations.png");
export const IMG_PROGRESS = staticFile("assets/global/sence_6_assets/proper_documants_and_update.png");
export const IMG_FORWARD_FAST = staticFile("assets/global/sence_6_assets/order_moves_forward_fast.png");
export const IMG_CLEAR_PROCESS = staticFile("assets/global/sence_6_assets/clear_process_from_start.png");

// ============================================================
// LOTTIE ANIMATIONS
// ============================================================
export const LOTTIE_SECURE = staticFile("assets/global/animated_icons/Shield.json");
export const LOTTIE_BANK = staticFile("assets/global/animated_icons/billing.json");
export const LOTTIE_SUCCESS = staticFile("assets/global/animated_icons/Success.json");
export const LOTTIE_SHIPPING = staticFile("assets/global/animated_icons/Shipping.json");
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
// SCENE 6 TIMINGS (frames @ 30fps) - Synced with Uganda script_metadata.json
// ============================================================

// Sentence 1: "Ensobi ey’omukaaga: Okusasula nga tewali nkola etegeerekeka ate nga esobola okulondolwa."
// Duration: 7.256s
export const SCENE6_LINE1_DUR = 218;

// Sentence 2: "Carbarn ekuwa enkola z’okusasula ezikuuma ssente zo nga 'bank transfer'"
// Duration: 5.102s
export const SCENE6_LINE2_DUR = 153;

// Sentence 3: "oba 'credit card'—era buli kimu kiba kyeyoleka okuva ku ntandikwa."
// Duration: 5.102s
export const SCENE6_LINE3_DUR = 153;

// Sentence 4: "Bw’oloonda okusasula ng’oyita mu banka, kiba kyangu, kigenda butereevu, era osobola okukirondoola."
// Duration: 7.732s
export const SCENE6_LINE4_DUR = 232;

// Sentence 5: "Bw’omala okusasula, osindika obukakufu, 'order' n’etambula"
// Duration: 4.934s
export const SCENE6_LINE5_DUR = 148;

// Sentence 6: "mangu, nga ofuna ebiwandiiko n’amawulire mu budde."
// Duration: 4.934s
export const SCENE6_LINE6_DUR = 148;

export const SCENE6_TOTAL_DUR =
    SCENE6_LINE1_DUR +
    SCENE6_LINE2_DUR +
    SCENE6_LINE3_DUR +
    SCENE6_LINE4_DUR +
    SCENE6_LINE5_DUR +
    SCENE6_LINE6_DUR;
