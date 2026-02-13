const fs = require('fs');
const path = require('path');

const API_KEY = "sk_58b986671e9c03f7f8212fffc0becf1c211aedc93fddb5b6";
const VOICE_ID = "SC7dE9527sxeZsMWVg9Z";
const TEXT = `Ensobi ey’okuna: Obutafaayo ku biwandiiko—n’otubira mu kufulumya mmotoka (clearing). Wano e Uganda, ebiwandiiko bikulu nnyo okwenkanankana n’emmotoka yennyini. Oteekwa okuba ne 'originals' entuufu eza 'customs' n’okuwandiisa mmotoka. Ne Carbarn, osobola okulondoola n’okuwanula (download) ebiwandiiko ebikulu ku 'dashboard' yo, n’ofuna byonna bye weetaaga, nga 'invoice' n’ebiwandiiko by’entambula—bwatyo tewabaawo byakubula oluvannyuma.`;

async function generateAudio() {
    console.log("Generating Uganda audio...");

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
    const outputPath = path.join(__dirname, '..', 'public', 'audio_scene4_uganda.mp3');

    fs.writeFileSync(outputPath, buffer);
    console.log(`Audio saved to: ${outputPath}`);
}

generateAudio();
