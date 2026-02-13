const { getAudioDurationInSeconds } = require("@remotion/media-utils");
const path = require("path");

async function checkDuration() {
    const audioPath = path.join(__dirname, "../public/audio_scene4_zimbabwe.mp3");
    const duration = await getAudioDurationInSeconds(audioPath);
    console.log(`--- Audio Analysis ---`);
    console.log(`File: audio_scene4_zimbabwe.mp3`);
    console.log(`Duration: ${duration.toFixed(2)} seconds`);
    console.log(`Total Frames (@30fps): ${Math.ceil(duration * 30)}`);
    console.log(`----------------------`);
}

checkDuration().catch(console.error);
