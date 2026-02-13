const { Input, ALL_FORMATS, FileSource } = require("mediabunny");
const fs = require("fs");
const path = require("path");

async function checkDuration() {
    const audioPath = path.join(__dirname, "../public/audio.mp3");
    const buffer = fs.readFileSync(audioPath);

    // FileSource in Mediabunny usually expects a File object or a Buffer/ArrayBuffer depending on environment
    // Let's see if we can use a direct path or buffer
    const input = new Input({
        formats: ALL_FORMATS,
        source: new FileSource(audioPath),
    });

    const durationInSeconds = await input.computeDuration();
    console.log(`Audio Duration: ${durationInSeconds} seconds`);
    console.log(`Total Frames (@30fps): ${Math.ceil(durationInSeconds * 30)}`);
}

checkDuration().catch(console.error);
