const fs = require('fs');
const path = require('path');

const API_KEY = "sk_58b986671e9c03f7f8212fffc0becf1c211aedc93fddb5b6";
const VOICE_ID = "SC7dE9527sxeZsMWVg9Z";
const TEXT = `For Zambia, your documents matter as much as the car. You need the right originals ready for customs and registration. And Zambia also requires a pre-shipment roadworthiness inspection carried out by ZCSA-appointed agents before the vehicle is used in Zambia. With Carbarn, you can track and download key documents through your dashboard, and you’ll receive what you need, including your invoice and shipping paperwork — so nothing is “missing later”.`;

async function generateAudio() {
    console.log("Generating Zambia audio...");

    const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': API_KEY,
            },
            body: JSON.stringify({
                text: TEXT,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                },
            }),
        }
    );

    if (!response.ok) {
        const error = await response.text();
        console.error("Error from ElevenLabs:", error);
        return;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const outputPath = path.join(__dirname, '..', 'public', 'audio_scene4_zambia.mp3');

    fs.writeFileSync(outputPath, buffer);
    console.log(`Audio saved to: ${outputPath}`);
}

generateAudio();
