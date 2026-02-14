export const SCENE1_LINE1_DUR = 46; // 1.52s * 30fps = 45.6 -> 46
export const SCENE1_LINE2_DUR = 255; // 8.493s * 30fps = 254.79 -> 255
export const SCENE1_LINE3_DUR = 255; // 8.493s * 30fps = 254.79 -> 255
export const SCENE1_LINE4_DUR = 265; // 8.828s * 30fps = 264.84 -> 265
export const SCENE1_LINE5_DUR = 265; // 8.828s * 30fps = 264.84 -> 265


// COLORS
export const TECH_BLUE = "#0052FF";
export const WARNING_RED = "#FF3B30";
export const WARNING_ORANGE = "#FF9500";
export const SUCCESS_GREEN = "#34C759";
export const TEXT_DARK = "#0A0A0B";
export const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// ASSETS
import { staticFile } from "remotion";
export const S1_IMG_00 = staticFile("assets/global/scene_1_assets/asset_00.png");
export const S1_IMG_01 = staticFile("assets/global/scene_1_assets/asset_01.png");
export const S1_IMG_02 = staticFile("assets/global/scene_1_assets/asset_02.png");
export const S1_IMG_03 = staticFile("assets/global/scene_1_assets/asset_03.png");
export const S1_IMG_04 = staticFile("assets/global/scene_1_assets/asset_04.png");
export const S1_IMG_05 = staticFile("assets/global/scene_1_assets/asset_05.png");
export const S1_IMG_06 = staticFile("assets/global/scene_1_assets/asset_05.png"); // Fallback or remove if unused

// LOTTIES
export const LOT_CAR = staticFile("assets/global/animated_icons/Car.json");
export const LOT_ALERT = staticFile("assets/global/animated_icons/Alert.json");
export const LOT_COMPLAIN = staticFile("assets/global/animated_icons/Complain.json");
export const LOT_HIGH_FIVE = staticFile("assets/global/animated_icons/High Five.json");
export const LOT_BADGE = staticFile("assets/global/animated_icons/Badge.json");
export const LOT_CHOOSE = staticFile("assets/global/animated_icons/Choose.json");

export const SCENE1_TOTAL_DUR = SCENE1_LINE1_DUR + SCENE1_LINE2_DUR + SCENE1_LINE3_DUR + SCENE1_LINE4_DUR + SCENE1_LINE5_DUR;
