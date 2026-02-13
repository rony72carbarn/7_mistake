const fs = require('fs');
const path = require('path');

const API_KEY = "sk_58b986671e9c03f7f8212fffc0becf1c211aedc93fddb5b6";
const VOICE_ID = "SC7dE9527sxeZsMWVg9Z";
const TEXT = "Ensobi ey’okubiri: Obutakebera mbeera ntuufu mmotoka gy’erimu. Ku Carbarn, ofuna alipoota z'okukebera bbiri nga tonnasalawo: 'Auction Sheet' eya 'original', ne 'Inspection Report' eya Carbarn. Wano w’okakasiza ebintu ebikulu: embeera y'okungulu n’eyomunda, n’ebizibu ebirala nga 'warning lights', obulale ku 'bumper', ebibaddewo munda, n'obuvune ku 'rims'—byonna nga biriko ebifaananyi n'annyinyonnyola. Eyo ye nkola ey’amazima gy’osobola okwesigamako.";

async function generateAudio() {
  console.log("Starting audio generation...");
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

  try {
    const response = await fetch(url, {
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
          similarity_boost: 0.5,
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error generating audio:', response.status, response.statusText);
      console.error('Error details:', error);
      process.exit(1);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const outputPath = path.join(__dirname, '..', 'public', 'audio.mp3');

    fs.writeFileSync(outputPath, buffer);
    console.log('Zimbabwe Shona Audio (Mistake #2) generated successfully:', outputPath);
  } catch (error) {
    console.error('Fetch error:', error);
    process.exit(1);
  }
}

generateAudio();
