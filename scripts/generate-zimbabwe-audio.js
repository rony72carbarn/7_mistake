const fs = require('fs');
const path = require('path');

const API_KEY = "sk_58b986671e9c03f7f8212fffc0becf1c211aedc93fddb5b6";
const VOICE_ID = "SC7dE9527sxeZsMWVg9Z";
const TEXT = `Mhosho yechina: Kusatarisa magwaro (paperwork) — wozoomerwa panguva yekubvisa motokari pabhodha. MuZimbabwe, magwaro ako akakosha zvakafanana nemotokari yacho. Unofanira kunge uine magwaro chaiwo akagadzirira kumasitendi (customs) nekunyoresa motokari — kusanganisira invoice, gwaro rekufambiswa kwenhumbi (Bill of Lading), nemagwaro anodiwa naZIMRA. PaCarbarn, unokwanisa kutevera magwaro akakosha aya padashboard yako.`;

async function generateAudio() {
    console.log("Generating Zimbabwe audio...");

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
                model_id: "eleven_multilingual_v2",
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
    const outputPath = path.join(__dirname, '..', 'public', 'audio_scene4_zimbabwe.mp3');

    fs.writeFileSync(outputPath, buffer);
    console.log(`Audio saved to: ${outputPath}`);
}

generateAudio();
