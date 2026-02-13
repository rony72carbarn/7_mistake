const fs = require('fs');
const path = require('path');

const API_KEY = "sk_58b986671e9c03f7f8212fffc0becf1c211aedc93fddb5b6";
const VOICE_ID = "SC7dE9527sxeZsMWVg9Z";
const TEXT = `Phoso ya bone: Go tlodisa matlho tshekolo ya dipampiri — mme o bo o palelwa ke go tlhatshwa koloi (clearance). Mo Botswana, dipampiri tsa gago di botlhokwa fela jaaka koloi yacho. O tlhoka dipampiri tsa nnete (originals) tse di siametseng lekgetho le go kwadisa koloi. BURS e tlhoka dipampiri jaaka SAD 500, pego ya mapodisi, le invoice. Mapodisi a Botswana gape a ntsha foromo ya BP17B gore o kgone go kwadisa koloi. Kwa Carbarn, o ka kgona go bona le go itsetsepela dipampiri tse mo dashboard ya gago sentle..`;

async function generateAudio() {
    console.log("Generating Botswana audio...");

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
                model_id: "eleven_multilingual_v2", // Using multilingual v2 for Setswana
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
    const outputPath = path.join(__dirname, '..', 'public', 'audio_scene4_botswana.mp3');

    fs.writeFileSync(outputPath, buffer);
    console.log(`Audio saved to: ${outputPath}`);
}

generateAudio();
