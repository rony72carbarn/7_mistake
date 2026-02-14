import { staticFile } from "remotion";

// timings from script_metadata.json @ 30fps
// S1: 0 - 4.239
export const SCENE5_LINE1_DUR = Math.floor(4.239 * 30);
// S3: 4.239 - 8.156 (splitting Sent 3 across Line 2 and 3)
export const SCENE5_LINE2_DUR = Math.floor(2.0 * 30);
export const SCENE5_LINE3_DUR = Math.floor((8.156 - 4.239 - 2.0) * 30);
// S4: 8.156 - 11.992
export const SCENE5_LINE4_DUR = Math.floor((11.992 - 8.156) * 30);
// S5+6: 11.992 - 30.03
export const SCENE5_LINE5_DUR = Math.floor((30.03 - 11.992) * 30);
export const SCENE5_BUFFER = 30;

export const SCENE5_TOTAL_DUR =
    SCENE5_LINE1_DUR +
    SCENE5_LINE2_DUR +
    SCENE5_LINE3_DUR +
    SCENE5_LINE4_DUR +
    SCENE5_LINE5_DUR +
    SCENE5_BUFFER;

// COLORS (Standardized with Scene 4)
export const TECH_BLUE = "#0052FF";
export const WARNING_RED = "#FF3B30";
export const WARNING_ORANGE = "#FF9500";
export const SUCCESS_GREEN = "#34C759";
export const TEXT_DARK = "#0A0A0B";
export const BG_DARK = "#020617";
export const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// ASSETS
export const S5_IMG_00 = staticFile("assets/global/scene_5_assets/asset_00.png");
export const S5_IMG_01 = staticFile("assets/global/scene_5_assets/asset_01.png");
export const S5_IMG_02 = staticFile("assets/global/scene_5_assets/asset_02.png");
export const S5_IMG_03 = staticFile("assets/global/scene_5_assets/asset_03.png");
export const S5_IMG_04 = staticFile("assets/global/scene_5_assets/asset_04.png");
export const S5_IMG_05 = staticFile("assets/global/scene_5_assets/asset_05.png");

// LOTTIES
export const LOT_ALERT = staticFile("assets/global/animated_icons/Alert.json");
export const LOT_CHECK = staticFile("assets/global/animated_icons/premium_some_icons/Check.json");
export const LOT_LOCK = staticFile("assets/global/animated_icons/lock.json");
export const LOT_SEARCH = staticFile("assets/global/animated_icons/search.json");
