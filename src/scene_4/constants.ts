import { staticFile } from "remotion";

// timings from script_metadata.json @ 30fps
export const SCENE4_LINE1_DUR = Math.floor(7.678 * 30);
export const SCENE4_LINE2_DUR = Math.floor(5.575 * 30);
export const SCENE4_LINE3_DUR = Math.floor(5.575 * 30);
export const SCENE4_LINE4_DUR = Math.floor(7.101 * 30);
export const SCENE4_LINE5_DUR = Math.floor(7.101 * 30);
export const SCENE4_BUFFER = 30;

export const SCENE4_TOTAL_DUR =
    SCENE4_LINE1_DUR +
    SCENE4_LINE2_DUR +
    SCENE4_LINE3_DUR +
    SCENE4_LINE4_DUR +
    SCENE4_LINE5_DUR +
    SCENE4_BUFFER;

// COLORS
export const TECH_BLUE = "#0052FF";
export const WARNING_RED = "#FF3B30";
export const WARNING_ORANGE = "#FF9500";
export const SUCCESS_GREEN = "#34C759";
export const TEXT_DARK = "#0A0A0B";
export const BG_DARK = "#020617";
export const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// ASSETS
export const S4_IMG_00 = staticFile("assets/global/scene_4_assets/asset_00.png");
export const S4_IMG_01 = staticFile("assets/global/scene_4_assets/asset_01.png");
export const S4_IMG_02 = staticFile("assets/global/scene_4_assets/asset_02.png");
export const S4_IMG_03 = staticFile("assets/global/scene_4_assets/asset_03.png");
export const S4_IMG_04 = staticFile("assets/global/scene_4_assets/asset_04.png");
export const S4_IMG_05 = staticFile("assets/global/scene_4_assets/asset_05.png");
export const S4_IMG_06 = staticFile("assets/global/scene_4_assets/asset_06.png");

// LOTTIES
export const LOT_ALERT = staticFile("assets/global/animated_icons/Alert.json");
export const LOT_CHECK = staticFile("assets/global/animated_icons/Check.json");
export const LOT_SEARCH = staticFile("assets/global/animated_icons/search.json");
export const LOT_BADGE = staticFile("assets/global/animated_icons/Badge.json");
export const LOT_MONEY = staticFile("assets/global/animated_icons/Trophy.json"); // Approximate for smart decision/success
