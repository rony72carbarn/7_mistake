import { staticFile } from "remotion";

export const SCENE3_LINE1_DUR = 157; // 5.239s
export const SCENE3_LINE2_DUR = 142; // Part of 9.453s
export const SCENE3_LINE3_DUR = 142; // Part of 9.453s
export const SCENE3_LINE4_DUR = 284; // 9.453s
export const SCENE3_LINE5_DUR = 38;  // 1.28s
export const SCENE3_LINE6_DUR = 84;  // 2.798s
export const SCENE3_LINE7_DUR = 202; // 6.74s
export const SCENE3_BUFFER = 30;

export const SCENE3_TOTAL_DUR =
    SCENE3_LINE1_DUR +
    SCENE3_LINE2_DUR +
    SCENE3_LINE3_DUR +
    SCENE3_LINE4_DUR +
    SCENE3_LINE5_DUR +
    SCENE3_LINE6_DUR +
    SCENE3_LINE7_DUR +
    SCENE3_BUFFER;

// COLORS
export const TECH_BLUE = "#0052FF";
export const WARNING_RED = "#FF3B30";
export const SUCCESS_GREEN = "#34C759";
export const TEXT_DARK = "#0A0A0B";
export const BG_DARK = "#020617";
export const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// ASSETS
export const S3_IMG_00 = staticFile("assets/global/scene_3_assets/asset_00.png");
export const S3_IMG_01 = staticFile("assets/global/scene_3_assets/asset_01.png");
export const S3_IMG_02 = staticFile("assets/global/scene_3_assets/asset_02.png");
export const S3_IMG_03 = staticFile("assets/global/scene_3_assets/asset_03.png");
export const S3_IMG_04 = staticFile("assets/global/scene_3_assets/asset_04.png");
export const S3_IMG_05 = staticFile("assets/global/scene_3_assets/asset_05.png");
export const S3_IMG_06 = staticFile("assets/global/scene_3_assets/asset_06.png");

// LOTTIES
export const LOT_CHOOSE = staticFile("assets/global/animated_icons/Choose.json");
export const LOT_ALERT = staticFile("assets/global/animated_icons/Alert.json");
export const LOT_GDPR = staticFile("assets/global/animated_icons/GDPR.json");
export const LOT_SEARCH = staticFile("assets/global/animated_icons/Search.json");
export const LOT_BADGE = staticFile("assets/global/animated_icons/Badge.json");
export const LOT_CHECK = staticFile("assets/global/animated_icons/premium_some_icons/Check.json");
