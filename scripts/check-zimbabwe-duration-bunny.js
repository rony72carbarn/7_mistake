const { Input, ALL_FORMATS, FileSource } = require("mediabunny");
const fs = require("fs");
const path = require("path");

async function checkDuration() {
    const audioPath = path.join(__dirname, "../public/audio_scene4_zimbabwe.mp3");

    const input = new Input({
        formats: ALL_FORMATS,
        source: new FileSource(audioPath),
    });

    const durationInSeconds = await input.computeDuration();
    console.log(`--- Zimbabwe Audio Analysis ---`);
    console.log(`Audio Duration: ${durationInSeconds.toFixed(2)} seconds`);
    console.log(`Total Frames (@30fps): ${Math.ceil(durationInSeconds * 30)}`);
    console.log(`-------------------------------`);
}

checkDuration().catch(console.error);
