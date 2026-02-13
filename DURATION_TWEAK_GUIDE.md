# How to Tweak Video Durations Manually

You can easily adjust how long each part of the video stays on screen by editing the timing constants.

## 1. Locate the Timing File
Open the following file:
[constants.ts](file:///c:/Users/Carbarn/Desktop/CARBARN/AUTOMATIONS/7_mistake/src/scene_4/constants.ts)

## 2. Understand the Constants
Find the section for **ZIMBABWE TIMINGS**. You will see:
```typescript
export const SCENE4_LINE1_DUR_ZIM = 93;   // Intro
export const SCENE4_LINE2_DUR_ZIM = 117;  // Documents matter
export const SCENE4_LINE3_DUR_ZIM = 10;  // Originals / Customs
export const SCENE4_LINE3_MAP_DUR_ZIM = 64; // Map reveal
export const SCENE4_LINE3_EXTRA_DUR_ZIM = 354; // ZIMRA focus
export const SCENE4_LINE4_DUR_ZIM = 153;  // Dashboard
```
*   **The numbers** represent the duration in **frames**.
*   The video runs at **30 frames per second (fps)**, so `30` frames = 1 second.
*   `60` = 2s, `150` = 5s, etc.

## 3. How to Adjust
If a scene feels too fast, **increase** its value. If it's too slow, **decrease** it.

> [!IMPORTANT]
> **Keep the Total Consistent!**
> The current Zimbabwe audio is exactly **981 frames** (approx. 32.7 seconds).
> If you add frames to one scene, you **must subtract** the same amount from another to keep the audio in sync.

## 4. Visual Aid
The code at the bottom of the file automatically calculates the total for you. As long as `SCENE4_TOTAL_DUR` is **981**, your sync will remain perfect.
