# Scene 4 Audio Synchronization Guide

## Step 1: Generate Voice-Over with ElevenLabs

### Script to Use:
```
For South Sudan, your documents matter as much as the car. You need the right originals ready for customs and registration. With Carbarn, you can track and download key documents through your dashboard, and you'll receive what you need, including your invoice and shipping paperwork — so nothing is "missing later".
```

### Scene Breakdown (for natural pauses):
1. **"For South Sudan, your documents matter as much as the car."** [PAUSE]
2. **"You need the right originals ready for customs and registration."** [PAUSE]
3. **"With Carbarn, you can track and download key documents through your dashboard,"** [PAUSE]
4. **"and you'll receive what you need,"** [PAUSE]
5. **"including your invoice and shipping paperwork"** [PAUSE]
6. **"— so nothing is 'missing later'."** [END]

### Voice Settings Recommendation:
- **Stability**: 0.5-0.6 (natural variation)
- **Clarity**: 0.7-0.8 (clear pronunciation)
- **Style**: Professional/Informative
- **Speed**: Normal (1.0x)

---

## Step 2: Save the Audio File

1. Download the generated audio from ElevenLabs
2. Save it as: `audio_scene4_south_sudan.mp3`
3. Place it in: `C:\Users\Carbarn\Desktop\CARBARN\AUTOMATIONS\7_mistake\public\`

---

## Step 3: Analyze Audio with FFmpeg (CRITICAL for Sync)

### Install FFmpeg (if not installed):
Download from: https://ffmpeg.org/download.html#build-windows

### Get Audio Duration:
```bash
cd "C:\Users\Carbarn\Desktop\CARBARN\AUTOMATIONS\7_mistake"
ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 public/audio_scene4_south_sudan.mp3
```

This will output the total duration in seconds (e.g., `35.428571`)

### Extract Waveform to Identify Phrase Boundaries:
```bash
ffmpeg -i public/audio_scene4_south_sudan.mp3 -filter_complex "showwavespic=s=1920x400" -frames:v 1 scene4_waveform.png
```

Open `scene4_waveform.png` to visually see where each phrase starts and ends.

### Listen and Note Timestamps:
Play the audio and note the timestamp where each scene's dialogue starts:

```
Scene 1 (Intro): 0:00 - ?:??
Scene 2 (Documents matter): ?:?? - ?:??
Scene 3 (Originals for customs): ?:?? - ?:??
Scene 4 (Dashboard tracking): ?:?? - ?:??
Scene 5 (Download docs): ?:?? - ?:??
Scene 6 (Invoice/paperwork): ?:?? - ?:??
Scene 7 (Nothing missing): ?:?? - ?:??
```

---

## Step 4: Calculate Frame Counts

Convert timestamps to frames (30fps):

**Formula:** `frames = seconds × 30`

**Example:**
- If Scene 1 ends at 3.2 seconds: `3.2 × 30 = 96 frames`
- If Scene 2 ends at 7.5 seconds: `7.5 × 30 = 225 frames` → Scene 2 duration = `225 - 96 = 129 frames`

---

## Step 5: Update Scene Timing Constants

Edit: `src/scene_4/constants.ts`

Replace the placeholder values with your calculated frame counts:

```typescript
// Scene 4 Timings (frames @ 30fps)
// TODO: Update these after analyzing audio with ffmpeg
export const SCENE4_LINE1_DUR = 90;   // Replace with actual frame count
export const SCENE4_LINE2_DUR = 140;  // Replace with actual frame count
export const SCENE4_LINE3_DUR = 150;  // Replace with actual frame count
export const SCENE4_LINE4_DUR = 160;  // Replace with actual frame count
export const SCENE4_LINE5_DUR = 140;  // Replace with actual frame count
export const SCENE4_LINE6_DUR = 150;  // Replace with actual frame count
export const SCENE4_LINE7_DUR = 180;  // Replace with actual frame count
```

**Example Update:**
```typescript
export const SCENE4_LINE1_DUR = 96;   // "For South Sudan..." (0.0s - 3.2s)
export const SCENE4_LINE2_DUR = 129;  // "your documents matter..." (3.2s - 7.5s)
// ... etc
```

---

## Step 6: Verify Total Duration

After updating all scene durations, verify the total matches your audio:

```typescript
export const SCENE4_TOTAL_DUR =
  SCENE4_LINE1_DUR +
  SCENE4_LINE2_DUR +
  SCENE4_LINE3_DUR +
  SCENE4_LINE4_DUR +
  SCENE4_LINE5_DUR +
  SCENE4_LINE6_DUR +
  SCENE4_LINE7_DUR;
```

**Check:** `SCENE4_TOTAL_DUR / 30` should equal your audio duration in seconds.

---

## Step 7: Update Root.tsx with Correct Duration

Edit: `src/Root.tsx`

The Scene4 composition duration should match `SCENE4_TOTAL_DUR`:

```typescript
<Composition
  id="Scene4"
  component={Scene4}
  durationInFrames={SCENE4_TOTAL_DUR}  // Auto-calculated from constants
  fps={30}
  width={1280}
  height={720}
/>
```

---

## Step 8: Test and Fine-Tune

### Test in Remotion Studio:
```bash
npm run dev
```

1. Select "Scene4" from the dropdown
2. Play through and check if visuals match audio
3. Look for any scenes that:
   - End too early (increase duration)
   - Run too long (decrease duration)
   - Transition at awkward moments (adjust timing)

### Fine-Tuning Tips:
- Add 3-5 frames buffer between scenes for smooth transitions
- Ensure text animations finish before scene ends
- Key moments should align with voice emphasis

---

## Quick Reference: Scene-to-Script Mapping

| Scene | Visual Content | Audio Script |
|-------|----------------|--------------|
| **Scene 1** | Mistake #4 badge + confused person | "For South Sudan," |
| **Scene 2** | Documents = Car illustration | "your documents matter as much as the car." |
| **Scene 3** | Original documents | "You need the right originals ready for customs and registration." |
| **Scene 4** | Dashboard screenshot | "With Carbarn, you can track and download key documents through your dashboard," |
| **Scene 5** | Download interface | "and you'll receive what you need," |
| **Scene 6** | Invoice/paperwork grid | "including your invoice and shipping paperwork" |
| **Scene 7** | Success celebration | "— so nothing is 'missing later'." |

---

## Troubleshooting

### Audio Not Playing:
- Check file exists: `public/audio_scene4_south_sudan.mp3`
- Verify file path in `Composition.tsx` line 510
- Restart dev server: `Ctrl+C` then `npm run dev`

### Scenes Out of Sync:
- Re-analyze audio with ffmpeg
- Double-check frame calculations (seconds × 30)
- Ensure no typing errors in `constants.ts`

### Video Duration Doesn't Match Audio:
- Check `SCENE4_TOTAL_DUR` calculation
- Verify `Root.tsx` uses `SCENE4_TOTAL_DUR`
- Ensure all 7 scene durations are added correctly

---

## Current Status

✅ Scene 4 visual animations completed
✅ Audio integration code added
✅ Scene wrapper with background animations ready
⏳ **WAITING:** Generate audio with ElevenLabs
⏳ **WAITING:** Analyze audio and update frame timings

**Next Steps:**
1. Generate voice-over with ElevenLabs
2. Save as `public/audio_scene4_south_sudan.mp3`
3. Follow Steps 3-8 above to sync

---

## Contact Points for Help

If you need help with any step, provide:
- Screenshot of waveform (`scene4_waveform.png`)
- Audio duration from ffprobe
- Any error messages from Remotion Studio
