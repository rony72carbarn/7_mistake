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
// SCENE 4 MAIN IMAGES (South Sudan - Document Management)
// ============================================================
export const IMG_MISTAKE_4_INTRO = staticFile("assets/global/sence4/mistake_number_four_first_img.png");
export const IMG_CARS_REPORT = staticFile("assets/global/sence4/cars_and_reprot.png");
export const IMG_DASHBOARD = staticFile("assets/global/sence4/dash_board.png");
export const IMG_DOCS_MATTER = staticFile("assets/global/sence4/documents_matter_as_car.png");
export const IMG_DOWNLOAD_DOCS = staticFile("assets/global/sence4/download_documents.png");
export const IMG_NOTHING_MISSING = staticFile("assets/global/sence4/noting_missing.png");
export const IMG_NOTHING_MISSING_ALT = staticFile("assets/global/sence4/noting_missing_later.png");
export const IMG_ORIGINALS_CUSTOMS = staticFile("assets/global/sence4/original_ready_for_customs.png");
export const IMG_ORIGINALS_PAPERS = staticFile("assets/global/sence4/originals_papers.png");

// ============================================================
// BOTSWANA FOCUS DOCUMENTS
// ============================================================
export const IMG_BOTS_BURS = staticFile("assets/global/sence4/Botswana_focus/BURS.png");
export const IMG_BOTS_INVOICE = staticFile("assets/global/sence4/Botswana_focus/invoice.png");
export const IMG_BOTS_POLICE = staticFile("assets/global/sence4/Botswana_focus/police_clearnce.png");
export const IMG_BOTS_SAD = staticFile("assets/global/sence4/Botswana_focus/SAD_paper.png");

// ============================================================
// ZAMBIA FOCUS DOCUMENTS
// ============================================================
export const IMG_ZAM_CUSTOMS = staticFile("assets/global/sence4/zambia_foucs/custom and registraosn.png");
export const IMG_ZAM_DASHBOARD = staticFile("assets/global/sence4/zambia_foucs/dashborad.png");
export const IMG_ZAM_DOCS = staticFile("assets/global/sence4/zambia_foucs/documants and compilance.png");
export const IMG_ZAM_ZCSA = staticFile("assets/global/sence4/zambia_foucs/zcsa pre-shipment.png");

// ============================================================
// LOTTIE ANIMATIONS - DOCUMENT & DASHBOARD RELATED
// ============================================================
export const LOTTIE_DASHBOARD = staticFile("assets/global/animated_icons/dashboard.json");
export const LOTTIE_DOWNLOAD = staticFile("assets/global/animated_icons/download.json");
export const LOTTIE_BILLING = staticFile("assets/global/animated_icons/billing.json");
export const LOTTIE_GDPR = staticFile("assets/global/animated_icons/GDPR.json");
export const LOTTIE_SHIELD = staticFile("assets/global/animated_icons/Shield.json");
export const LOTTIE_SUBMITTED = staticFile("assets/global/animated_icons/Submitted.json");
export const LOTTIE_VALIDATION = staticFile("assets/global/animated_icons/Validation.json");
export const LOTTIE_ALERT = staticFile("assets/global/animated_icons/Alert.json");
export const LOTTIE_SUCCESS = staticFile("assets/global/animated_icons/Success.json");
export const LOTTIE_SHIPPING = staticFile("assets/global/animated_icons/Shipping.json");
export const LOTTIE_REPORT = staticFile("assets/global/animated_icons/Report V2.json");
export const LOTTIE_THUMBS_UP = staticFile("assets/global/animated_icons/Thumbs up.json");
export const LOTTIE_DOWNLOADING = staticFile("assets/global/animated_icons/Downloading Progress.json");
export const LOTTIE_ANALYTICS = staticFile("assets/global/animated_icons/analytics.json");
export const LOTTIE_SEARCH = staticFile("assets/global/animated_icons/search.json");
export const LOTTIE_TROPHY = staticFile("assets/global/animated_icons/Trophy.json");
export const LOTTIE_PULSE = staticFile("assets/global/animated_icons/Activate.json");
export const LOTTIE_DASHBOARD_PREMIUM = staticFile("assets/global/animated_icons/dashboard.json");
export const LOTTIE_STAMP = staticFile("assets/global/animated_icons/Success.json");

export const IMG_UGANDA_MAP = staticFile("assets/carbarn_uganda/regonal_map.png");
export const IMG_UGANDA_PORT = staticFile("assets/carbarn_uganda/port.webp");
export const IMG_UGANDA_ARRIVAL = staticFile("assets/carbarn_uganda/car_arival_to_port.png");
export const IMG_ZAM_MAP = staticFile("assets/carbarn_zambia/regonal_map.png");
export const IMG_BOTS_MAP = staticFile("assets/carbarn_botswana/regonal_map.png");
export const IMG_ZIM_MAP = staticFile("assets/carbarn_zimbabwe/regonal_map.png");
export const LOTTIE_CAR = staticFile("assets/global/animated_icons/Car.json");

// ============================================================
// REGION TOGGLE
// ============================================================
export const CURRENT_REGION: string = 'UGANDA';

// ============================================================
// CARBARN LOGO
// ============================================================
export const LOGO = CURRENT_REGION === 'BOTSWANA'
  ? staticFile("assets/carbarn_botswana/main_logo.webp")
  : CURRENT_REGION === 'ZIMBABWE'
    ? staticFile("assets/carbarn_zimbabwe/main_logo.webp")
    : CURRENT_REGION === 'UGANDA'
      ? staticFile("assets/carbarn_uganda/main_logo.webp")
      : staticFile("assets/carbarn_zambia/main_logo.webp");

// ============================================================
// SCENE 4 TIMINGS (frames @ 30fps)
// ============================================================

// ZAMBIA TIMINGS
export const SCENE4_LINE1_DUR_ZAM = 35;
export const SCENE4_LINE2_DUR_ZAM = 75;
export const SCENE4_LINE3_DUR_ZAM = 100;
export const SCENE4_LINE3_EXTRA_DUR_ZAM = 155;
export const SCENE4_LINE3_MAP_DUR_ZAM = 150;
export const SCENE4_LINE4_DUR_ZAM = 135;
export const SCENE4_LINE5_DUR_ZAM = 60;
export const SCENE4_LINE6_DUR_ZAM = 90;
export const SCENE4_LINE7_DUR_ZAM = 132;

// BOTSWANA TIMINGS (~1238 frames total)
export const SCENE4_LINE1_DUR_BOT = 150; // Intro
export const SCENE4_LINE2_DUR_BOT = 160; // Map / Documents matter
export const SCENE4_LINE3_DUR_BOT = 180; // Originals / Customs
export const SCENE4_LINE3_EXTRA_DUR_BOT = 260; // BURS Specifics (SAD 500, etc)
export const SCENE4_LINE3_MAP_DUR_BOT = 240;   // BP17B Police Focus
export const SCENE4_LINE4_DUR_BOT = 248;       // Dashboard & Success

// ZIMBABWE TIMINGS (~981 frames total)
export const SCENE4_LINE1_DUR_ZIM = 93;   // Intro
export const SCENE4_LINE2_DUR_ZIM = 117;  // Documents matter
export const SCENE4_LINE3_DUR_ZIM = 200;  // Originals / Customs (Reduced for map)
export const SCENE4_LINE3_MAP_DUR_ZIM = 164; // Zimbabwe Map reveal
export const SCENE4_LINE3_EXTRA_DUR_ZIM = 254; // Invoice, BoL, ZIMRA
export const SCENE4_LINE4_DUR_ZIM = 153;       // Dashboard

// UGANDA TIMINGS (~1066 frames total)
export const SCENE4_LINE1_DUR_UG = 190;   // Intro
export const SCENE4_LINE2_DUR_UG = 195;  // Documents matter
export const SCENE4_LINE3_DUR_UG = 150;  // Originals / Customs
export const SCENE4_LINE3_MAP_DUR_UG = 120; // Uganda Map reveal
export const SCENE4_LINE3_EXTRA_DUR_UG = 240; // URA Documents focus
export const SCENE4_LINE4_DUR_UG = 171;       // Dashboard

// ACTIVE DURATIONS
export const SCENE4_LINE1_DUR = CURRENT_REGION === 'BOTSWANA' ? SCENE4_LINE1_DUR_BOT : CURRENT_REGION === 'ZIMBABWE' ? SCENE4_LINE1_DUR_ZIM : CURRENT_REGION === 'UGANDA' ? SCENE4_LINE1_DUR_UG : SCENE4_LINE1_DUR_ZAM;
export const SCENE4_LINE2_DUR = CURRENT_REGION === 'BOTSWANA' ? SCENE4_LINE2_DUR_BOT : CURRENT_REGION === 'ZIMBABWE' ? SCENE4_LINE2_DUR_ZIM : CURRENT_REGION === 'UGANDA' ? SCENE4_LINE2_DUR_UG : SCENE4_LINE2_DUR_ZAM;
export const SCENE4_LINE3_DUR = CURRENT_REGION === 'BOTSWANA' ? SCENE4_LINE3_DUR_BOT : CURRENT_REGION === 'ZIMBABWE' ? SCENE4_LINE3_DUR_ZIM : CURRENT_REGION === 'UGANDA' ? SCENE4_LINE3_DUR_UG : SCENE4_LINE3_DUR_ZAM;
export const SCENE4_LINE3_EXTRA_DUR = CURRENT_REGION === 'BOTSWANA' ? SCENE4_LINE3_EXTRA_DUR_BOT : CURRENT_REGION === 'ZIMBABWE' ? SCENE4_LINE3_EXTRA_DUR_ZIM : CURRENT_REGION === 'UGANDA' ? SCENE4_LINE3_EXTRA_DUR_UG : SCENE4_LINE3_EXTRA_DUR_ZAM;
export const SCENE4_LINE3_MAP_DUR = CURRENT_REGION === 'BOTSWANA' ? SCENE4_LINE3_MAP_DUR_BOT : CURRENT_REGION === 'ZIMBABWE' ? SCENE4_LINE3_MAP_DUR_ZIM : CURRENT_REGION === 'UGANDA' ? SCENE4_LINE3_MAP_DUR_UG : SCENE4_LINE3_MAP_DUR_ZAM;
export const SCENE4_LINE4_DUR = CURRENT_REGION === 'BOTSWANA' ? SCENE4_LINE4_DUR_BOT : CURRENT_REGION === 'ZIMBABWE' ? SCENE4_LINE4_DUR_ZIM : CURRENT_REGION === 'UGANDA' ? SCENE4_LINE4_DUR_UG : SCENE4_LINE4_DUR_ZAM;

// Line 5, 6, 7 are mostly for Zambia but we'll cap them at 0 for Botswana/Zimbabwe/Uganda
export const SCENE4_LINE5_DUR = (CURRENT_REGION === 'BOTSWANA' || CURRENT_REGION === 'ZIMBABWE' || CURRENT_REGION === 'UGANDA') ? 0 : 60;
export const SCENE4_LINE6_DUR = (CURRENT_REGION === 'BOTSWANA' || CURRENT_REGION === 'ZIMBABWE' || CURRENT_REGION === 'UGANDA') ? 0 : 90;
export const SCENE4_LINE7_DUR = (CURRENT_REGION === 'BOTSWANA' || CURRENT_REGION === 'ZIMBABWE' || CURRENT_REGION === 'UGANDA') ? 0 : 132;

export const SCENE4_TOTAL_DUR =
  SCENE4_LINE1_DUR +
  SCENE4_LINE2_DUR +
  SCENE4_LINE3_DUR +
  SCENE4_LINE3_EXTRA_DUR +
  SCENE4_LINE3_MAP_DUR +
  SCENE4_LINE4_DUR +
  SCENE4_LINE5_DUR +
  SCENE4_LINE6_DUR +
  SCENE4_LINE7_DUR;
